const express = require('express')
const itemRoutes = require('./itemRoutes')
const ExpressError = require("./expressError")


const app = express();
app.use(express.json())

//Routes
app.use('/items', itemRoutes)



/** 404 handler */
app.use(function (req, res, next) {
    return new ExpressError("Not Found", 404);
  });
  
  /** general error handler */
  
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
  
    return res.json({
      error: err.message,
    });
  });
  




module.exports = app;