const express = require('express');
// const dotenv = require('dotenv');

// dotenv.config({path: './config.env'})

const userRouter = require('./routes/userRoutes');
const tourRouter = require('./routes/tourRoute');


// initialized the express app
const app = express();

// Parse JSON bodies for this app. Make sure you put
// `app.use(express.json())` **before** your route handlers!
app.use(express.json());

app.use('/api/v1/users', userRouter)
app.use('/api/v1/tours', tourRouter)


module.exports = app;

