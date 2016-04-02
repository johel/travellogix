(function(){

  'use strict'

  // Set the 'NODE_ENV' variable
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';

  console.log("process.env.NODE_ENV", process.env.NODE_ENV);

  var express = require('express'),
  request = require('request'),
  config = require('./config'),
  bodyParser = require('body-parser'),
  authService = require('./authService'),
  contentService = require('./contentService'),
  logger = require('morgan');

  var app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  // Use the 'NODE_ENV' variable to activate the 'morgan' logger or not
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    app.use(logger('dev'));

    app.route('/')
      .get(authService.checkForToken, function(req,res){
        contentService.getContent(req,res);
      })
      .post(authService.checkForToken, function(req,res){
        contentService.getContent(req,res);
      });

    app.route('/failauth')
      .get(contentService.getContent)
      .post(contentService.getContent);

    app.route('/auth')
      .get(authService.checkForToken, function(req,res){
        var token = config.getToken();
        res.send({token:token});
      })
      .post(authService.checkForToken, function(req,res){
        var token = config.getToken();
        res.send({token:token});
      })

  } else if (process.env.NODE_ENV === 'production') {
    app.route('/')
      .get(authService.checkForToken, function(req,res){
        contentService.getContent(req,res);
      })
      .post(authService.checkForToken, function(req,res){
        contentService.getContent(req,res);
      });
  }


  app.listen(3000, function(){
    console.log('Express server listening on port 3000');
  });

})()



