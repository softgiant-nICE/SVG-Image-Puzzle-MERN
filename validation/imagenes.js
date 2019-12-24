const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateImagenesInput(data) {
	let errors = {};

	data.website = !isEmpty(data.website) ? data.website : '';
	data.title = !isEmpty(data.title) ? data.title : '';
	data.imageSVG = !isEmpty(data.imageSVG) ? data.imageSVG : '';
	data.description = !isEmpty(data.description) ? data.description : '';

	console.log(data.imageSVG);
	if (Validator.isEmpty(data.title)) {
		errors.title = 'título requerido';
	}

	if (Validator.isEmpty(data.imageSVG)) {
		errors.imageSVG = 'imagen requerida';
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
