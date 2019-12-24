const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCuestionariosInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.idTema = !isEmpty(data.idTema) ? data.idTema : "";
  data.idImagen = !isEmpty(data.idImagen) ? data.idImagen : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "título requerido";
  }

  if (Validator.isEmpty(data.idTema)) {
    errors.resume = "Necesitas seleccionar un tema";
  }

  if (Validator.isEmpty(data.idImagen)) {
    errors.topics = "Necesitas seleccionar una imagen";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
