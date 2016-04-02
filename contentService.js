(function(){
  'use strict'
  
  var request = require('request');

  var getErrorMessage = function(err) {
    if (err.errors) {
      for (var errName in err.errors) {
        if (err.errors[errName].message) 
          return err.errors[errName].message;
      }
    }else {
      return 'Unknown server error';
    }
  };

  var data = {
    "Language": "ENG",
    "Currency": "USD",
    "destination": "MCO",
    "DateFrom": "11/26/2016",
    "DateTO": "11/29/2016",
    "Occupancy": {
     "AdultCount": "1",
     "ChildCount": "1",
     "ChildAges": ["10"]
    }
  };

  function getOptions(token){
    var options =  {
      method:'POST',
      url:'http://travellogix.api.test.conceptsol.com/api/Ticket/Search',
      body:JSON.stringify(data),
      headers:{
        'Content-Type':'application/json',
        'Authorization': 'Bearer ' + token
      }
    };
    
    return options;
  }

  exports.getContent = function(req,res,token){
    var options = getOptions(token);
      request(options, function(error, response, body){
        if (!error && response.statusCode == 200) {
          var info = JSON.parse(body);
          res.send({result:info.Result[0].DateFrom.Date});
        }else{
          return res.status(400).send({error:error, messsage:'There was an error during API Service Request'});
        }
      }); 
  }

})()