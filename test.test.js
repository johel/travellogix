var superagent = require('superagent')
var expect = require('expect.js')

describe('test proxy express rest api server concerning token logic', function(){

  //    *********** assumes expiring time in config file to be 3000 milliseconds***********************
   

  it('should ask for two different tokens', function(done){
    this.timeout(6 * 1000);
    var firstToken, secondToken;
    superagent.post('http://localhost:3000/auth')
      .end(function(e, res){
        if(!e){
          console.log('body1', res.body);
          firstToken = res.body.token;
        }
      });

      setTimeout(function(){
        superagent.post('http://localhost:3000/auth')
          .end(function(e, res){
            if(!e){
              secondToken = res.body.token;
              console.log('body2', res.body);
              expect(secondToken).to.not.equal(firstToken);
            }
            done();
          })
      },4000);
  });

  it('should reuse the same token', function(done){
    this.timeout(6 * 1000);
    var firstToken, secondToken;
    superagent.post('http://localhost:3000/auth')
      .end(function(e, res){
        if(!e){
          console.log('body1', res.body);
          firstToken = res.body.token;
        }
      });

      setTimeout(function(){
        superagent.post('http://localhost:3000/auth')
          .end(function(e, res){
            if(!e){
              secondToken = res.body.token;
              console.log('body2', res.body);
              expect(secondToken).to.equal(firstToken);
            }
            done();
          })
      },1000);
  });

  //********End of time test********************8

})
