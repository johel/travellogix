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

  it('It should get error making request without authorization header', function(done){
    superagent.post('http://localhost:3000/failauth')
      .send(postData)
      .end(function(e, res){
        expect(e).not.to.equal(null);
        done();
      })
  });

  it('Should get access_token if there is no error in external service', function(done){
    superagent.post('http://localhost:3000/auth')
      .send('grant_type=password&username=test1%40test2.com&password=Aa234567%21')
      .end(function(e, res){
        if(!e){
          expect(res.statusCode).to.equal(200);
        }else{
          expect(e).not.to.equal(null);
          done();
        }
      })
  });

})
