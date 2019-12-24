const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Validation
const validateTemasInput = require("../../validation/temas");

// Load Image Model
const Temas = require("../../models/Temas");
// Load User Model
const User = require("../../models/User");

// @route   GET api/image/test
// @desc    Tests image route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Temas Works" }));

// @route   GET api/image
// @desc    Get current users image
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Temas.find({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(tema => {
        if (!tema) {
          errors.notema = "There is no tema for this user";
          return res.status(404).json(errors);
        }
        res.json(tema);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   GET api/temas/all
// @desc    Get all images
// @access  Public
router.get("/all", (req, res) => {
  const errors = {};

  Temas.find()
    .populate("user", ["name", "avatar"])
    .then(temas => {
      if (!temas) {
        errors.notemas = "There are no temas";
        return res.status(404).json(errors);
      }
      res.json(temas);
    })
    .catch(err => res.status(404).json({ image: "There are no temas" }));
});

// @route   POST api/temas/tema
// @desc    Create or edit user tema
// @access  Private
router.post(
  "/tema",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTemasInput(req.body);

    // Check Validation
    if (!isValid) {
      console.log("no es valido");
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const temaFields = {};
    temaFields.user = req.user.id;
    if (req.body.title) temaFields.title = req.body.title;
    if (req.body.grade) temaFields.grade = req.body.grade;
    if (req.body.website) temaFields.website = req.body.website;
    if (req.body.description) temaFields.description = req.body.description;
    if (req.body.resume) temaFields.resume = req.body.resume;
    // Skills - Spilt into array
    if (typeof req.body.topics !== "undefined") {
      temaFields.topics = req.body.topics.split(",");
    }

    Temas.find({ user: req.user.id, title: req.body.title }).then(temas => {
      // si existe, actualiza
      if (temas.length >= 1) {
        Temas.findOneAndUpdate(
          { user: req.user.id, title: req.body.title },
          { $set: temaFields },
          { new: true }
        ).then(image => res.json(image));
      }
      // si no existe, crealo
      else {
        new Temas(temaFields).save().then(tema => res.json(tema));
      }
    });
  }
);

// @route   DELETE api/image/addcurso/:exp_id
// @desc    Delete addcurso from image
// @access  Private
router.delete(
  "/temas/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Temas.findOneAndRemove({ _id: req.params.exp_id })
      .then(temas => {
        Temas.find({ user: req.user.id }).then(temas => res.json(temas));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/image
// @desc    Delete user and image
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Image.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
