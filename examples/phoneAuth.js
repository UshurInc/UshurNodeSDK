'use strict';

var ushur = require('./auth');
var Engagement = require('../index').Engagement;

ushur.on('loginSuccess', function (userData) {
  //Initialize an ushur

  var data = {
    phoneNumber: "+16614187487"
  };

  ushur.authentication(data)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

});
