'use strict';

var request = require('request');
var config = require('./config');
var qs = require('querystring');

/**
 * A utility function to make HTTP requests to the API
 * @param       {String} method  HTTP Methot to use, example POST, GET, DELETE etc.
 * @param       {String} token   Auth token to send along with the request
 * @param       {String} endPoint Endpint URI of the API
 * @param       {Object} params  Query params to pass along
 * @param       {Object} payload Actual data to go with the request
 * @constructor
 */
function Http(method, token, endPoint, params, payload, hostname) {
  this.method = method;
  this.tokenId = token;
  this.endPoint = endPoint;
  this.params = params || {};
  this.payload = payload;
  this.hostname = hostname;
}

module.exports = Http;

Http.prototype.send = function () {
  var _this = this;
  var querystring = Object.assign({token: _this.tokenId}, _this.params );

  Object.assign(_this.payload, {apiVer: config.API_VERSION, tokenId: _this.tokenId});

  return new Promise(function (resolve, reject) {

    var requestOptions = {
      method: _this.method,
      body: _this.payload,
      uri: _this.hostname ? (_this.hostname + _this.endPoint) : (config.API_URL + _this.endPoint),
      json: true
    };
    request(requestOptions, function (error, httpResponse, body) {
      if(error) reject(error);
      else if(body && body.status === "failure") reject(body);
      else resolve(body);
    });

  });
};
