const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = 'Tu publicación debe contener entre 10 y 300 caracteres;'
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Campo de texto requerido';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
