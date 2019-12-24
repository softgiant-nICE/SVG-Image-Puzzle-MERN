const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = 'El nombre debe contener entre 2 y 30 caracteres';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Ingresa un Nombre';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Es requerido un correo electronico';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Correo electrónico Inválido';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Se requiere ingresar una contraseña';
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'La contraseña debe contener un minimo de 6 caracteres';
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = 'Se requiere confirmar la contraseña seleccionada';
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = 'Contraseña incorrecta';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
