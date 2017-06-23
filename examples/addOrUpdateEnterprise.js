'use strict';

var ushur = require('./auth');
var Engagement = require('../index').Engagement;

ushur.on('loginSuccess', function (userData) {
  //Initialize an ushur

  var data = [];
  data.push({
    "incidentId":"INC00001",
    "userName":"Henry",
    "userPhoneNo":"+16614187487"
  });


  ushur.addOrUpdateEnterpriseData(data)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

});
