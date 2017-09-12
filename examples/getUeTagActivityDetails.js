/**
 *   Ushur Node SDK:  https://github.com/UshurInc/UshurNodeSDK.git
 *   Install as per the instructions in this repo and use the following sample, 
 *   in perhaps the examples folder.
 */
'use strict';

var ushur = require('./auth');

ushur.on('loginSuccess', function(userData) { //Get activity

    var options = {
        "campaignId": "UshurIncidentCreator",
        "UeTag": "UeTag_793441",
        startDate: new Date("01-01-2017 00:00"),
        endDate: new Date("08-30-2017 23:59")
    };
    
    ushur.getResponses(options)
        .then(function(res) {
            console.log(res);
        })
        .catch(function(err) {
            console.log(err);
        });
});
