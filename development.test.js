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

  it('Request should get content after authentication', function(done){
    superagent.post('http://localhost:3000/')
      .send(postData)
      .end(function(e, res){
        expect(res.body.Result).to.be.an('array');
        done();
      })
  });

  it('It should get error making request without authorization header', function(done){
    superagent.post('http://localhost:3000/failauth')
      .send(postData)
      .end(function(e, res){
        expect(e).not.to.equal(null);
        done();
      })
  });

  it('Should get access_token if there is no error on external service', function(done){
    superagent.post('http://localhost:3000/auth')
      .end(function(e, res){
        if(!e){
          expect(res.statusCode).to.equal(200);
        }
        done();
      })
  });

});
