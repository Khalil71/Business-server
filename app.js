const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const routes = require('./src/routes/routes');

let app = express();
let port = process.env.PORT || 3000;

mongoose.connect('mongodb://test1:test1@ds245805.mlab.com:45805/business', function mongoConnect() {
  console.log('mongoose connection success'); // eslint-disable-line
}, { useNewUrlParser: true });

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', routes);

app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handler
app.use((err, req, res, next) => {
  res.status(err.status).send({ status: err.status, message: err.message });
  next();
});

app.listen(port, () => {
  console.log('now listening on port ' + port); // eslint-disable-line
});
