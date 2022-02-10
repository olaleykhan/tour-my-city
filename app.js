const express = require('express');
// const dotenv = require('dotenv');

// dotenv.config({path: './config.env'})

const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoute');
const AppError = require('./utils/appError');

// initialized the express app
const app = express();

// Parse JSON bodies for this app. Make sure you put
// `app.use(express.json())` **before** your route handlers!
app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/tours', tourRouter);

// middleware to handle invalid/ non-existent urls or routes
app.all('*', (req, res, next) => {
  const error = new AppError(
    `the route : ${req.originalUrl} with request method: ${req.method} does not exist. try again with a valid  URL or method`,
    404
  );

  // error.status = 'fail';
  // error.statusCode = 404;
  //   error.message = 'ooopsie';
  next(error);
  //   res.status(404).json({
  //     status: 'Fail',
  //     message: `the route : ${req.originalUrl} with request method: ${req.method} does not exist. try again with a valid  URL or method`,
  //   });
});

app.use((err, req, res, next) => {
  err.status = err.status || 'Error';
  err.statusCode = err.statusCode || 500;
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message || 'Internal server error',
  });
});

module.exports = app;

