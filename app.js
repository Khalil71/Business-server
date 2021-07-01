const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const routes = require('./src/routes/routes');
const { portNumber } = require('./src/services/references');
const { mongoStart } = require('./src/services/templates');

let app = express();
let port = process.env.PORT || portNumber;

mongoStart();

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
