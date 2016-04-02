(function(){

  var request = require('request'),
      config = require('./config');

  var expiringTokenMilisenconds = config.expiringTokenMilisenconds;
  var initialTime = null;
  // var count = 0;

  var hasTokenTimeExceed = function(initialTime){
    var currentTime = new Date();
    if(currentTime.getTime() - initialTime.getTime() > expiringTokenMilisenconds){
      console.log('time exceeded')
      return true;
    }else{
      console.log('time did not exceed')
      return false;
    }
  }

  var tokenOptions = {
    method:'POST',
    url: 'http://travellogix.api.test.conceptsol.com/Token',
    body:config.password
  };


  exports.checkForToken = function(req,res,next){

    function setToken(error, response, body) {
      // count+=1;
      // if(count ===2){
      //   console.log('setting token for the second time');
      // }
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        initialTime = new Date();
        config.setToken(info.access_token);
        console.log('body', info);
        next();
      }else{
        return res.status(502).send({error:error, messsage:'It was not possible to authenticate Travellogix API'});
        // config.setToken(count);
        // initialTime = new Date();
        // next();
      }
    }

    if(config.getToken() == null || hasTokenTimeExceed(initialTime)){
      request(tokenOptions, setToken);
    }else{
      next();
    }
  };

  exports.getToken = function(){
    return apiToken;
  };

})()
