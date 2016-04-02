var superagent = require('superagent')
var expect = require('expect.js')

var postData = {
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

describe('proxy express rest api server', function(){

  //    *********** assumes expiring time in config file to be 3000 milliseconds***********************
  it('should ask for two different tokens', function(done){
    this.timeout(5 * 1000);
    var firstToken, secondToken;
    superagent.post('http://localhost:3000/')
      .send(postData)
      .end(function(e, res){
        if(!e){
          firstToken = res.access_token;
        }
      });

      setTimeout(function(){
        superagent.post('http://localhost:3000/')
          .send(postData)
          .end(function(e, res){
            if(!e){
              secondToken = res.token;
              expect(secondToken).not.to.equal(firstToken);
            }
            done();
          })
      },4000);
  });

  it('should reuse the same token', function(done){
    this.timeout(5 * 1000);
    var firstToken, secondToken;
    superagent.post('http://localhost:3000/')
      .send(postData)
      .end(function(e, res){
        if(!e){
          firstToken = res.access_token;
        }
      });

      setTimeout(function(){
        superagent.post('http://localhost:3000/')
          .send(postData)
          .end(function(e, res){
            if(!e){
              secondToken = res.token;
              expect(secondToken).to.equal(firstToken);
            }
            done();
          })
      },2000);
  });

  //********End of time test********************8

})
