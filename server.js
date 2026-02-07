'use strict';
require('dotenv').config();
const express = require('express');
const fccTesting = require('./freeCodeCamp/fcctesting.js');

const app = express();

app.set('view engine', 'pug');
app.set('views', './views/pug');

app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', 'https://www.freecodecamp.org');
  res.set('Access-Control-Allow-Credentials', true);
  next();
});

fccTesting(app); 
app.use('/public', express.static(process.cwd() + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.route('/').get((req, res) => {
  res.render('index');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Listening on port ${PORT}`);
});