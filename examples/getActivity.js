'use strict';

var ushur = require('./auth');
var Engagement = require('../index').Engagement;

ushur.on('loginSuccess', function (userData) {
  //Get activity

  // ushur.getActivity("7daa8996-3edb-43d7-a260-36635ab722c9-1497147190852")
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  var options = {
    startDate: new Date("6-21-2017 5:48"),
    endDate: new Date("6-23-2017 5:48")
  };
  ushur.getResponses(options)
  .then(function (res) {
    console.log(res);
  })
  .catch(function (err) {
    console.log(err);
  });

});
