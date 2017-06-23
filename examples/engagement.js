'use strict';

var ushur = require('./auth');
var Engagement = require('../index').Engagement;

ushur.on('loginSuccess', function (userData) {
  //Initialize an ushur

  var engagement = new Engagement({
    userPhoneNo: "+16614187487",
    campaignId: "UshurIncidentCreator",
    requestId: "Ashfaq:3580"
  });

  ushur.initEngagement(engagement)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

});
