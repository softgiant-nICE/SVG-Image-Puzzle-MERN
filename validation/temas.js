const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateTemasInput(data) {
  let errors = {};

  data.website = !isEmpty(data.website) ? data.website : "";
  data.title = !isEmpty(data.title) ? data.title : "";
  data.grade = !isEmpty(data.grade) ? data.grade : "";
  data.topics = !isEmpty(data.topics) ? data.topics : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.resume = !isEmpty(data.resume) ? data.resume : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "título requerido";
  }

  if (Validator.isEmpty(data.resume)) {
    errors.resume = "Resumen requerido";
  }

  if (Validator.isEmpty(data.grade)) {
    errors.grade = "Grado requerido";
  }

  if (Validator.isEmpty(data.topics)) {
    errors.topics = "Campo de topicos es requerido";
  }

  if (Validator.isEmpty(data.website)) {
    errors.website = "URL invalida";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
