'use strict';

var Ushur = require('../index').Ushur;

/**
 * Initialize Ushur (Events Style)
 * @type {Ushur}
 */
var ushur = new Ushur({
  email: "apiuserx@ushurdummy.me",
  password: "userxpasswd"
});

//Do something when login is successful
// ushur.on('loginSuccess', function (userData) {
//   console.log(userData);
// });
// 
// //Do something when login fails
// ushur.on('loginFalure', function (error) {
//   console.log(error);
// });

module.exports = ushur;

/**
 * nitialize Ushur (Promise style)
 * @type {Ushur}
 */
// var ushur = new Ushur({
//   email: "apiuserx@ushurdummy.me",
//   password: "userxpasswd"
// })
// .then(function(userData){
//   //Login Success
//   console.log(userData);
// })
// .catch(function(error){
//   //login failed
//   console.log(error);
// });
