const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
