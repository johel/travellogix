(function(){

  'use strict'

  var express = require('express'),
  request = require('request'),
  bodyParser = require('body-parser'),
  authService = require('./authService'),
  contentService = require('./contentService'),
  logger = require('morgan');

  var app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(logger('dev'));

  // Set the application view engine and 'views' folder
  // app.set('views', './views');
  // app.set('view engine', 'ejs');

  app.route('/')
    .get(authService.checkForToken, function(req,res){
      var token = authService.getToken();
      contentService.getContent(req,res,token);
    });

  app.listen(3000, function(){
    console.log('Express server listening on port 3000');
  });

})()



