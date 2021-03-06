import React from 'react';
import axios from 'axios';

import EventsList from './EventsList';
import EventForm from './EventForm';
import FormErrors from './FormErrors';

import validations from '../validations';

import './Eventlite.css';

class Eventlite extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      events: [],
      title: { value: '', valid: false },
      start_datetime: { value: '', valid: false },
      location: { value: '', valid: false },
      formErrors: {},
      formValid: false
    };
    this.logo = React.createRef();
  }

  static formValidations = {
    title: [
      (value) => { return(validations.checkMinLength(value, 3)) }
    ],
    start_datetime: [
      (value) => { return validations.checkMinLength(value, 1) },
      (value) => { return validations.timeShouldBeInTheFuture(value) }
    ],
    location: [
      (value) => { return(validations.checkMinLength(value, 1)) }
    ]
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: 'http://localhost:3001/api/v1/events'
    })
    .then(response => {
      this.setState({ events: response.data });
    });
  }

  handleInput = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value
    const newState = {};
    newState[name] = { ...this.state[name], value: value };
    this.setState(newState, () => this.validateField(name, value, Eventlite.formValidations[name]));
  }

  validateField(fieldName, fieldValue, fieldValidation) {
    let fieldValid = true;
    let errors = fieldValidation.reduce((errors, validation) => {
      let[valid, fieldError] = validation(fieldValue);
      if (!valid) {
        errors = errors.concat(fieldError);
      }
      return errors;
    }, []);

    fieldValid = errors.length === 0;

    const newState = { formErrors: { ...this.state.formErrors, [fieldName]: errors } };
    newState[fieldName] = { ...this.state.[fieldName], valid: fieldValid };
    this.setState(newState, this.validateForm);
  } 

  validateForm() {
    this.setState({ formValid: this.state.title.valid && this.state.start_datetime.valid && this.state.location.valid });
  }

  handleSubmit = event => {
    event.preventDefault();
    let newEvent = {
      title: this.state.title.value,
      start_datetime: this.state.start_datetime.value,
      location: this.state.location.value
    }
    axios({
      method: 'POST',
      url: 'http://localhost:3001/api/v1/events',
      headers: JSON.parse(localStorage.user),
      data: { event: newEvent }
    })
    .then(response => {
      this.addNewEvent(response.data);
      this.resetFormErrors();
    })
    .catch(error => {
      console.log(error.response.data);
      this.setState({ formErrors: error.response.data })
    });
  }

  resetFormErrors() {
    this.setState({ formErrors: {} });
  }

  addNewEvent = event => {
    const events = [...this.state.events, event].sort(function(a, b) {
      return new Date(a.start_datetime) - new Date(b.start_datetime);
    });
    this.setState({ events: events }, this.props.changeLogoColour);
  }

  render() {
    return (
      <div>
        <FormErrors formErrors={this.state.formErrors} />
        <EventForm handleInput={this.handleInput} 
          handleSubmit={this.handleSubmit}
          title={this.state.title.value}
          start_datetime={this.state.start_datetime.value}
          location={this.state.location.value}
          formValid={this.state.formValid} />
        <EventsList events={this.state.events} />
      </div>
    )
  }
}

export default Eventlite;
