(function(){
	'use strict'
	var token = null;

	module.exports = {
		password:'grant_type=password&username=test1%40test2.com&password=Aa234567%21',
		expiringTokenMilisenconds: 3*1000, //3 seconds
		token:null,
		getToken: function(){return token;},
		setToken: function(newToken){token = newToken;}
	}

})()