const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Correo electronico inválido';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'se requiere un correo electronico';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Se requiere una contraseña';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
