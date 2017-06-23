'use strict';

var ushur = require('./auth');
var Engagement = require('../index').Engagement;

ushur.on('loginSuccess', function (userData) {
  //Initialize an ushur

  var data = {
    phoneNumber: "+16614187487",
    authNumber: "319181",
    phAuthTransactionId:"204c076b-9400-48dc-9fc1-4e003d476bf8-1498185915044"
  };

  ushur.confirmation(data)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

});
