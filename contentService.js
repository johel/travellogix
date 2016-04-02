(function(){
  'use strict'
  
  var request = require('request'),
      config = require('./config');


  function getOptions(req){
    var token = config.getToken();
    var options =  {
      method:'POST',
      url:'http://travellogix.api.test.conceptsol.com/api/Ticket/Search',
      body: JSON.stringify(req.body),
      headers:{
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
      }
    };
    
    return options;
  }

  exports.getContent = function(req,res){
    var token = config.getToken();
    var options = getOptions(req);
    console.log('getContentOptions', options);
      request(options, function(error, response, body){
        if (!error && response.statusCode == 200) {
          var info = JSON.parse(body);
          res.send({result:info.Result[0].DateFrom.Date});
        }else{
          return res.status(502).send({error:error, messsage:'There was an error during API Service Request'});
        }
      }); 
  }

})()