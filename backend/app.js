const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();

app.use(morgan('dev'));

app.use(cookieParser());
app.use(express.json());

// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
);

// Set the _csrf token and create req.csrfToken method
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
);


const routes = require('./routes');

app.use(routes); // Connect all the routes

// Catch unhandled requests and forward to error handler.
app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
});
// If this resource-not-found middleware is called, an error will be created
// with the message "The requested resource couldn't be found." and a status
// code of 404. Afterwards, next will be invoked with the error. Remember, next
// invoked with nothing means that error handlers defined after this middleware
// will not be invoked. However, next invoked with an error means that error
// handlers defined after this middleware will be invoked.



const { ValidationError } = require('sequelize');

// Process sequelize errors
app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
      err.errors = err.errors.map((e) => e.message);
      err.title = 'Validation error';
    }
    next(err);
  });
//   If the error that caused this error-handler to be called is an instance
//   of ValidationError from the sequelize package, then the error was created
//   from a Sequelize database validation error and the additional keys of title
//   string and errors array will be added to the error and passed into the
//   next error handling middleware.

// // Error formatter
// app.use((err, _req, res, _next) => {
//     res.status(err.status || 500);
//     console.error(err);
//     res.json({
//       title: err.title || 'Server Error',
//       message: err.message,
//       errors: err.errors,
//       stack: isProduction ? null : err.stack
//     });
//   });



// My own Error formatter
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
      message: err.message,
      statusCode: err.statusCode,
      errors: err.errors,
      stack: isProduction ? null : err.stack
    });
  });

module.exports = app;
