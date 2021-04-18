import React from 'react';
import PropTypes from 'prop-types';

class AuthenticationForm extends React.Component {
  render() {
    return (
      <div>
        <h2>{ this.props.formName }</h2>
        <form id={ this.props.id } onSubmit={this.props.submit}>
          <input name="email" ref={(input) => this.email = input} onChange={this.props.fieldValidation} />
          <input name="password" type="password" ref={(input) => this.password = input} onChange={this.props.fieldValidation} />
          <input type="submit" value={this.props.formName} disabled={!this.props.valid} />
        </form>
      </div>  
    )
  }
}

AuthenticationForm.propTypes = {
  formName: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  submit: PropTypes.func.isRequired,
  fieldValidation: PropTypes.func.isRequired,
  valid: PropTypes.bool.isRequired
}

export default AuthenticationForm;
