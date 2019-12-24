const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateImageInput(data) {
	let errors = {};

	data.handle = !isEmpty(data.handle) ? data.handle : '';
	data.status = !isEmpty(data.status) ? data.status : '';
	data.skills = !isEmpty(data.skills) ? data.skills : '';

	if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
		errors.handle =
			'El nombre de usuario debe contener entre 2 y 40 caracteres';
	}

	if (Validator.isEmpty(data.handle)) {
		errors.handle = 'Nombre de usuario requerido';
	}

	if (Validator.isEmpty(data.status)) {
		errors.status = 'Estatus requerido';
	}

	if (Validator.isEmpty(data.skills)) {
		errors.skills = 'Campo de habilidades es requerido';
	}

	if (!isEmpty(data.website)) {
		if (!Validator.isURL(data.website)) {
			errors.website = 'URL invalida';
		}
	}

	if (!isEmpty(data.youtube)) {
		if (!Validator.isURL(data.youtube)) {
			errors.youtube = 'URL invalida';
		}
	}

	if (!isEmpty(data.twitter)) {
		if (!Validator.isURL(data.twitter)) {
			errors.twitter = 'URL invalida';
		}
	}

	if (!isEmpty(data.facebook)) {
		if (!Validator.isURL(data.facebook)) {
			errors.facebook = 'URL invalida';
		}
	}

	if (!isEmpty(data.linkedin)) {
		if (!Validator.isURL(data.linkedin)) {
			errors.linkedin = 'URL invalida';
		}
	}

	if (!isEmpty(data.instagram)) {
		if (!Validator.isURL(data.instagram)) {
			errors.instagram = 'URL invalida';
		}
	}

	return {
		errors,
		isValid: isEmpty(errors)
	};
};
