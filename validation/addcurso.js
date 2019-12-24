const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateAddcursoInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Se requiere el titulo del trabajo ";
  }

  if (Validator.isEmpty(data.company)) {
    errors.company = "Se requiere el nombre de la compañia ";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "Es requerido seleccionar una fecha ";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
