const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Validation
const validateCuestionariosInput = require('../../validation/cuestionarios');

// Load Image Model
const Cuestionarios = require('../../models/Cuestionarios');
// Load User Model
const User = require('../../models/User');

// @route   GET api/image/test
// @desc    Tests image route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Cuestionarios Works' }));

// @route   GET api/image
// @desc    Get current users image
// @access  Private
router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const errors = {};

		Cuestionarios.findOne({ user: req.user.id })
			.populate('user', ['name', 'avatar'])
			.then(cuestionario => {
				if (!cuestionario) {
					errors.nocuestionario = 'There is no cuestionario for this user';
					return res.status(404).json(errors);
				}
				res.json(cuestionario);
			})
			.catch(err => res.status(404).json(err));
	}
);

// @route   GET api/cuestionarios/byUser
// @desc    Get all images
// @access  Public
router.get(
	'/byUser',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const errors = {};
		Cuestionarios.find({ user: req.user.id })
			.populate('user', ['name', 'avatar'])
			.populate('idImagen')
			.populate('idTema')
			.exec()
			.then(cuestionarios => {
				if (!cuestionarios) {
					errors.nocuestionarios = 'There are no cuestionarios';
					return res.status(404).json(errors);
				}
				res.json(cuestionarios);
			})
			.catch(err =>
				res.status(404).json({ cuestionarios: 'There are no cuestionarios' })
			);
	}
);

// @route   GET api/cuestionarios/byUser
// @desc    Get all images
// @access  Public
router.get('/all', (req, res) => {
	const errors = {};
	Cuestionarios.find()
		.populate('user', ['name', 'avatar'])
		.populate('idImagen')
		.populate('idTema')
		.exec()
		.then(cuestionarios => {
			if (!cuestionarios) {
				errors.nocuestionarios = 'There are no cuestionarios';
				return res.status(404).json(errors);
			}
			res.json(cuestionarios);
		})
		.catch(err =>
			res.status(404).json({ cuestionarios: 'There are no cuestionarios' })
		);
});

// @route   POST api/cuestionarios/cuestionario
// @desc    Create or edit user cuestionario
// @access  Private
router.post(
	'/cuestionario',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validateCuestionariosInput(req.body);

		// Check Validation
		if (!isValid) {
			console.log('no es valido');
			// Return any errors with 400 status
			return res.status(400).json(errors);
		}

		// Get fields
		const cuestionarioFields = {};
		cuestionarioFields.user = req.user.id;
		if (req.body.title) cuestionarioFields.title = req.body.title;
		if (req.body.idTema) cuestionarioFields.idTema = req.body.idTema;
		if (req.body.idImagen) cuestionarioFields.idImagen = req.body.idImagen;

		// Skills - Spilt into array
		if (typeof req.body.reactives !== 'undefined') {
			cuestionarioFields.reactives = req.body.reactives;
		}

		Cuestionarios.find({ user: req.user.id, title: req.body.title }).then(
			cuestionarios => {
				// si existe, actualiza
				if (cuestionarios.length >= 1) {
					Cuestionarios.findOneAndUpdate(
						{ user: req.user.id, title: req.body.title },
						{ $set: cuestionarioFields },
						{ new: true }
					).then(image => res.json(image));
				}
				// si no existe, crealo
				else {
					new Cuestionarios(cuestionarioFields)
						.save()
						.then(cuestionario => res.json(cuestionario));
				}
			}
		);
	}
);

// @route   DELETE api/image/addcurso/:exp_id
// @desc    Delete addcurso from image
// @access  Private
router.delete(
	'/cuestionarios/:exp_id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Cuestionarios.findOneAndRemove({ _id: req.params.exp_id })
			.then(cuestionarios => {
				Cuestionarios.find({ user: req.user.id }).then(cuestionarios =>
					res.json(cuestionarios)
				);
			})
			.catch(err => res.status(404).json(err));
	}
);

// @route   DELETE api/image
// @desc    Delete user and image
// @access  Private
router.delete(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Image.findOneAndRemove({ user: req.user.id }).then(() => {
			User.findOneAndRemove({ _id: req.user.id }).then(() =>
				res.json({ success: true })
			);
		});
	}
);

module.exports = router;
