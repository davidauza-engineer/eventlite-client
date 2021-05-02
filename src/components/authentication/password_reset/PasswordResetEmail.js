import { useState } from 'react';

import axios from 'axios';

import ServerErrors from '../ServerErrors';

const PasswordResetEmail = () => {
  const [displayForm, setDisplayForm] = useState(false);
  const [emailField, setEmailField] = useState('');
  const [serverResponse, setServerResponse] = useState('');
  const [serverErrors, setServerErrors] = useState([]);
  const [submitEnabled, setSubmitEnabled] = useState(true);
  const [formErrors, setFormErrors] = useState({});

  const handleLinkClick = (event) => {
    event.preventDefault();
    setDisplayForm(true);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setServerErrors([]);
    setServerResponse('');
    axios({
      method: 'POST',
      url: 'http://localhost:3001/auth/password',
      data: {
        email: emailField,
        redirect_url: 'http://localhost:3000/password_reset'
      }
    })
    .then(response => {
      setServerResponse(response.data.message);
      setSubmitEnabled(false);
    })
    .catch(error => setServerErrors(error.response.data.errors));
  }

  const handleChange = (event) => {
    event.preventDefault();
    setEmailField(event.target.value);
  }

  return (
    <div className='password-reset'>
      <a href='#' onClick={handleLinkClick}>
        Forgot your password? Click here to reset it!
      </a>
      {displayForm &&
        <>
          <form className='form' onSubmit={handleSubmit}>
            <input type='text' name='email' placeholder='Enter your email' value={emailField} onChange={handleChange} />
            <input type='submit' value='Send reset email' disabled={!submitEnabled}/>
            <p className='text-email-reset'>We'll send you a link to reset your password.</p>
          </form>
          <div>
            {Object.keys(formErrors).map(errorType => (
              formErrors[errorType].map(error => (
                <p>{errorType} {error}</p>
              )
            )))}
          </div>
          <ServerErrors errors={serverErrors} />
          <p>{serverResponse}</p>
        </>
      }
    </div>  
  )
}

export default PasswordResetEmail;
