const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const multer = require('multer'); // file storing middleware
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

// Load Validation
const validateImageInput = require('../../validation/image');
const validateImagenesInput = require('../../validation/imagenes');
const validateAddcursoInput = require('../../validation/addcurso');
const validateAddreactivosInput = require('../../validation/addreactivos');
const validateAddinfoInput = require('../../validation/addinfo');

// Load Image Model
const Image = require('../../models/Image');
// Load Imagenes Model
const Imagenes = require('../../models/Imagenes');
// Load User Model
const User = require('../../models/User');

// @route   GET api/image/test
// @desc    Tests image route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Image Works' }));

// @route   GET api/image
// @desc    Get current users image
// @access  Private
router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const errors = {};

		console.log(req.user.id);
		Imagenes.find({ user: req.user.id })
			.populate('user', ['name', 'avatar'])
			.then(image => {
				if (!image) {
					errors.noimage = 'There is no image for this user';
					return res.status(404).json(errors);
				}
				res.json(image);
			})
			.catch(err => res.status(404).json(err));
	}
);

// @route   GET api/image/all
// @desc    Get all images
// @access  Public
router.get('/all', (req, res) => {
	const errors = {};

	Imagenes.find()
		.then(images => {
			if (images.length === 0) {
				errors.noimage = 'There are no images';
				return res.status(404).json(errors);
			}
			res.json(images);
		})
		.catch(err => res.status(404).json({ image: 'There are no images' }));
});

// @route   GET api/image/handle/:handle
// @desc    Get image by handle
// @access  Public

router.get('/handle/:handle', (req, res) => {
	const errors = {};

	Image.findOne({ handle: req.params.handle })
		.populate('user', ['name', 'avatar'])
		.then(image => {
			console.log(req.params.handle);
			if (!image) {
				errors.noimage = 'There is no image for this user';
				res.status(404).json(errors);
			}

			res.json(image);
		})
		.catch(err => res.status(404).json(err));
});

// @route   GET api/image/user/:user_id
// @desc    Get image by user ID
// @access  Public

router.get('/user/:user_id', (req, res) => {
	const errors = {};

	Image.findOne({ user: req.params.user_id })
		.populate('user', ['name', 'avatar'])
		.then(image => {
			if (!image) {
				errors.noimage = 'There is no image for this user';
				res.status(404).json(errors);
			}

			res.json(image);
		})
		.catch(err =>
			res.status(404).json({ image: 'There is no images for this user' })
		);
});

// @route   POST api/image
// @desc    Create or edit user image
// @access  Private
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validateImageInput(req.body);

		// Check Validation
		if (!isValid) {
			// Return any errors with 400 status
			return res.status(400).json(errors);
		}

		// Get fields
		const imageFields = {};
		imageFields.user = req.user.id;
		if (req.body.handle) imageFields.handle = req.body.handle;
		if (req.body.title) imageFields.title = req.body.title;
		if (req.body.website) imageFields.website = req.body.website;
		if (req.body.description) imageFields.description = req.body.description;
		if (req.body.resume) imageFields.resume = req.body.resume;
		if (req.body.status) imageFields.status = req.body.status;
		if (req.body.githubusername)
			imageFields.githubusername = req.body.githubusername;
		// Skills - Spilt into array
		if (typeof req.body.topics !== 'undefined') {
			imageFields.topics = req.body.topics.split(',');
		}

		// Social
		imageFields.social = {};
		if (req.body.youtube) imageFields.social.youtube = req.body.youtube;
		if (req.body.twitter) imageFields.social.twitter = req.body.twitter;
		if (req.body.facebook) imageFields.social.facebook = req.body.facebook;
		if (req.body.linkedin) imageFields.social.linkedin = req.body.linkedin;
		if (req.body.instagram) imageFields.social.instagram = req.body.instagram;

		Image.findOne({ user: req.user.id }).then(image => {
			if (image) {
				// Update

				Image.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: imageFields },
					{ new: true }
				).then(image => res.json(image));
			} else {
				// Create

				// Check if handle exists
				Image.findOne({ handle: imageFields.handle }).then(image => {
					if (image) {
						errors.handle = 'That handle already exists';
						res.status(400).json(errors);
					}

					// Save Image
					new Image(imageFields).save().then(image => res.json(image));
				});
			}
		});
	}
);

// @route   POST api/image/addcurso
// @desc    Add addcurso to image (image es el curso como tal)
// @access  Private

/* Servicio de almacenamiento de imagenes en la nube*/
cloudinary.config({
	cloud_name: 'marbe',
	api_key: '593924744443784',
	api_secret: '_HFkc65DyP_ijaenWfdvfPM7j_o'
});

const storage = cloudinaryStorage({
	cloudinary: cloudinary,
	folder: 'user',
	allowedFormats: ['svg'],
	transformación: [{ width: 700, crop: 'limit' }]
});
/* Servicio de almacenamiento de imagenes en la nube*/

/* var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "users/user");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  }
}); */

var upload = multer({ storage: storage });

router.post(
	'/subirImagen',
	passport.authenticate('jwt', { session: false }),
	upload.single('file'),
	(req, res) => {
		let objetos = req.body.objects;
		let imagenesFields = {
			user: req.user.id,
			title: req.body.title,
			description: req.body.description
		};

		if (req.file !== undefined) {
			imagenesFields.imageSVG = req.file.url;
		} else {
			imagenesFields.imageSVG = req.body.imageSVG;
			imagenesFields.objects = JSON.parse(objetos);
		}

		const { errors, isValid } = validateImagenesInput(imagenesFields);

		// Check Validation
		if (!isValid) {
			// Return any errors with 400 status
			return res.status(400).json(errors);
		}

		Imagenes.find({ user: req.user.id, title: req.body.title }).then(
			imagenes => {
				// si existe, actualiza
				if (imagenes.length >= 1) {
					Imagenes.findOneAndUpdate(
						{ user: req.user.id, title: req.body.title },
						{ $set: imagenesFields },
						{ new: true }
					).then(image => res.json(image));
				}
				// si no existe, crealo
				else {
					new Imagenes(imagenesFields).save().then(imagen => res.json(imagen));
				}
			}
		);
	}
);

router.post(
	'/addcurso',
	passport.authenticate('jwt', { session: false }),
	upload.single('file'),
	(req, res) => {
		const { errors, isValid } = validateAddcursoInput(req.body);

		// Check Validation
		if (!isValid) {
			// Return any errors with 400 status
			return res.status(400).json(errors);
		}

		Image.findOne({ user: req.user.id }).then(image => {
			const newExp = {
				title: req.body.title,
				title: req.body.title,
				description: req.body.description,
				from: req.body.from,
				to: req.body.to,
				current: req.body.current,
				description: req.body.description,

				imageSVG: {
					id: req.file.public_id,
					idCurso: req.body.title,
					fileName: req.file.fieldname,
					url: req.file.url
				}
			};
			// MONGOOSE
			// Add to exp array
			image.addcurso.unshift(newExp);
			image.save().then(image => res.json(image));
		});
	}
);

// @route   POST api/image/addreactivos
// @desc    Add addreactivos to image (agrega los reactivos a cada imagen)
// @access  Private

router.post(
	'/addreactivos',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validateAddreactivosInput(req.body);

		// Check Validation
		if (!isValid) {
			console.log('Este es un error de validacion');
			// Return any errors with 400 status
			return res.status(400).json(errors);
		}

		Image.findOne({
			user: req.user.id
		}).then(image => {
			image.addcurso.map(curso => {
				if (curso.title === req.body.cursoId) {
					console.log(curso.imageSVG.url);
					console.log(req.body.svgUrl);
					if (curso.imageSVG.url === req.body.svgUrl) {
						req.body.reactivos.forEach(element => {
							if (element.idObjeto !== null) {
								curso.imageSVG.reactivos.unshift(element);
							}
						});
					}
				}
			});
			// Add to exp array
			/* image.unshift(newEdu);*/

			image.save().then(image => {
				res.json(image.addcurso);
			});
		});
	}
);

// @route   POST api/image/addinfo
// @desc    Add addinfo to image
// @access  Private
router.post(
	'/addinfo',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validateAddinfoInput(req.body);

		// Check Validation
		if (!isValid) {
			// Return any errors with 400 status
			return res.status(400).json(errors);
		}

		Image.findOne({ user: req.user.id }).then(image => {
			const newEdu = {
				school: req.body.school,
				degree: req.body.degree,
				fieldofstudy: req.body.fieldofstudy,
				from: req.body.from,
				to: req.body.to,
				current: req.body.current,
				description: req.body.description
			};

			// Add to exp array
			image.addinfo.unshift(newEdu);

			image.save().then(image => res.json(image));
		});
	}
);

// @route   DELETE api/image/addcurso/:exp_id
// @desc    Delete addcurso from image
// @access  Private
router.delete(
	'/addcurso/:exp_id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Image.findOne({ user: req.user.id })
			.then(image => {
				// Get remove index
				const removeIndex = image.addcurso
					.map(item => item.id)
					.indexOf(req.params.exp_id);

				// Splice out of array
				image.addcurso.splice(removeIndex, 1);

				// Save
				image.save().then(image => res.json(image));
			})
			.catch(err => res.status(404).json(err));
	}
);

// @route   DELETE api/image/addcurso/:exp_id
// @desc    Delete addcurso from image
// @access  Private
router.delete(
	'/addinfo/:exp_id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		console.log('peticion de eliminacion');
		console.log(req.params.exp_id);
		Imagenes.findOneAndRemove({ _id: req.params.exp_id })
			.then(imagenes => {
				Imagenes.find({ user: req.user.id }).then(imagenes => {
					res.json(imagenes);
				});
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
