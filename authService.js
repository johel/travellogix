(function(){

  var request = require('request');
  var expiringTokenMilisenconds = 86000*1000;
  var initialTime = null;
  var apiToken = null;
  
  var hasTokenTimeExceed = function(initialTime){
    var currentTime = new Date();
    if(currentTime.getTime() - initialTime.getTime() > expiringTokenMilisenconds){
      return true;
    }else{
      return false;
    }
  }

  var tokenOptions = {
    method:'POST',
    url: 'http://travellogix.api.test.conceptsol.com/Token',
    body:'grant_type=password&username=test1%40test2.com&password=Aa234567%21'
  };


  exports.checkForToken = function(req,res,next){
    
    function setToken(error, response, body) {
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        apiToken = info.access_token;
        console.log('body', info);
        next();
      }
    }

    if(apiToken == null || hasTokenTimeExceed(initialTime)){
      request(tokenOptions, setToken);
    }else{
      next();
    }
  };

  exports.getToken = function(){
    return apiToken;
  };

})()
