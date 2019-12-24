const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer'); // file storing middleware
const passport = require('passport');
const path = require('path');
var cors = require('cors');
const temas = require('./routes/api/temas');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const image = require('./routes/api/image');
const posts = require('./routes/api/posts');
const cuestionarios = require('./routes/api/cuestionarios');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Conectado'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require('./config/passport')(passport);
app.use(cors());
// Use Routes
app.use('/api/temas', temas);
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/image', image);
app.use('/api/posts', posts);
app.use('/api/cuestionarios', cuestionarios);

app.use(express.static(path.join(__dirname, '/client/build')));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));
