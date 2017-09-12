/**
 *   Ushur Node SDK:  https://github.com/UshurInc/UshurNodeSDK.git
 *   Install as per the instructions in this repo and use the following sample, 
 *   in perhaps the examples folder.
 */
'use strict';

var ushur = require('./auth');

ushur.on('loginSuccess', function(userData) { 

    var options = {
        "campaignId": "UshurIncidentCreator",
        "cmd": "getUeTagList"
    };

    ushur.getUeTagList(options)
        .then(function(res) {
            console.log(res);
        })
        .catch(function(err) {
            console.log(err);
        });
});
