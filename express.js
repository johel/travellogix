(function(){

  'use strict'

  // Set the 'NODE_ENV' variable
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';

  console.log("process.env.NODE_ENV", process.env.NODE_ENV);

  var express = require('express'),
  request = require('request'),
  config = require('./config'),
  bodyParser = require('body-parser'),
  authService = require('./services/authService'),
  contentService = require('./services/contentService'),
  logger = require('morgan');

  var app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  // Use the 'NODE_ENV' variable to activate the 'morgan' logger or not
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    app.use(logger('dev'));
  }

  // Routing - If gets bigger, put in a different fileor directory called routes
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {

    app.route('/')
      .post(authService.checkForToken, contentService.getContent);

    app.route('/failauth')
      .post(contentService.getContent);

    app.route('/auth')
      .post(authService.checkForToken, function(req,res){
        var token = config.getToken();
        res.send({token:token});
      });

  } else if (process.env.NODE_ENV === 'production') {
    app.route('/')
      .post(authService.checkForToken, contentService.getContent);
  }


  app.listen(3000, function(){
    console.log('Express server listening on port 3000');
  });

})()



