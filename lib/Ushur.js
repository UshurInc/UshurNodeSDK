'use strict';

var Http = require('./Http');
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var Promise = require('bluebird');
var Engagement = require('./Engagement');

/**
 * Ushur initializer and authenticator
 * @param       {Object} credentials An object containing email and password
 * @constructor
 */
function Ushur(credentials) {

  credentials = credentials || {};
  EventEmitter.call(this);

  /**
   * Email associated with Ushur account
   * @type {String}
   */
  this.email = credentials.email;

  /**
   * Password associated with ushur account
   * @type {String}
   */
  this.password = credentials.password;

  /**
   * Authentication token to be sent along with every request
   * @type {String}
   */
  this.tokenId = undefined;

  //Authenticate in the start
  if(credentials.mode && credentials.mode.toLowerCase() == "promise")
      return this.auth();
  else
      this.auth();

}

module.exports = Ushur;
util.inherits(Ushur, EventEmitter);


Ushur.prototype.auth = function () {
  var payload = {
    email: this.email,
    password: this.password
  };
  var _this = this;
  return new Promise(function (resolve, reject) {
    var http = new Http('POST', undefined, 'rest/login', undefined, payload);
    return http.send().then(function (userData) {
      _this.tokenId = userData.tokenId;
      _this.emit('loginSuccess', userData);
      resolve(userData);
    }).catch(function (error) {
      _this.emit('loginFalure', error);
      reject(error);
    });
  });

};

/**
 * To initiate an Ushur (also called as Campaign) to a
 * specific phone number if this is a single campaign but if a bulk
 * campaign the Ushur will be launched to all the users in the
 * enterprise and hence the userPhoneNo parameter will be ignored
 * if present.
 * @param  {Engagement} ushur An instance of Engagement
 * @return {Promise}       A promise that resolves to the response from API
 */
Ushur.prototype.initEngagement = function (engagement) {
  var _this = this;

  if(engagement instanceof Engagement && engagement.userPhoneNo && engagement.campaignId){
    engagement.cmd = 'initCampaign';
    var http = new Http('POST', _this.tokenId, 'initUshur', {}, engagement);
    return http.send();
  }else{
    throw new Error('Provide a valid engagement');
  }
};

/**
 * Ushur will be launched to all the users in the
 * enterprise and hence the userPhoneNo parameter will be ignored
 * if present.
 * @param  {Engagement} ushur An instance of Engagement
 * @return {Promise}       A promise that resolves to the response from API
 */
Ushur.prototype.initBulkEngagement = function (engagement) {
  var _this = this;

  if(engagement instanceof Engagement && engagement.userPhoneNo && engagement.campaignId){
    engagement.cmd = 'initBulkCampaign';
    var http = new Http('POST', _this.tokenId, 'initUshur', {}, engagement);
    return http.send();
  }else{
    throw new Error('Provide a valid engagement');
  }
};

Ushur.prototype.getActivity = function (activityId) {
  var _this = this;
  if(!activityId)
    throw new Error('Provide a valid activity ID');
  var payload = {activityId: activityId};
  var http = new Http('POST', _this.tokenId, 'infoQuery/getUshurActivity', {}, payload);
  return http.send();
};

/**
 * Instead of getting all the detailed information as part of the query,
 * here we get the responses for specific tags which implies
 * responses on specific micro-engagement.
 * @param  {Object} [params={ requestId:"", UeTag:[] }] An object with following optional keys
 * requestId, UeTag (Array of strings or a string with comma separated tags),
 * nRecords, lastRecordId, campaignId, filterCmd (array of strings or comma
 * separated keywords in a string), startDate (new Date), endDate (new Date)
 * @return {Promise}             Promise that resolves to the response from the API
 */
Ushur.prototype.getResponses = function (params = {}) {
  var _this = this;
  var payload = {
    requestId: params.requestId,
    cmd: params.requestId ? "responseForReqId" : params.cmd,
    onlyParent: params.onlyParent,
    onlyPrimary: params.onlyPrimary,
    UeTag: params.UeTag ? (typeof params.UeTag === "string"? params.UeTag : params.UeTag.join()): undefined,
    nRecords: params.nRecords || "50",
    lastRecordId: params.lastRecordId,
    campaignId: params.campaignId,
    entId: params.entId ? params.entId : null,
    apiSecToken: params.apiSecToken ? params.apiSecToken : null,
    startDate: params.startDate ? params.startDate.toISOString(): undefined,
    endDate: params.endDate ? params.endDate.toISOString(): undefined,
    userPhoneNo: params.userPhoneNo,
    filterCmd: params.filterCmd ? (typeof params.filterCmd === "string"? params.filterCmd : params.filterCmd.join()): undefined,
  };

  var http = new Http('POST', _this.tokenId, 'infoQuery', {}, payload);
  return http.send();
};

/**
 * Retrieving campaign specific information here being the UeTag List on a mentioned ushur/campaign
 * @return {Promise}             Promise that resolves to the response from the API
 */
Ushur.prototype.getUeTagList = function (params = {}) {
  var _this = this;
  var payload = {
    cmd: params.cmd ? 'getUeTagList' : undefined,
    campaignId: params.campaignId
  };

  var http = new Http('POST', _this.tokenId, 'infoQuery', {}, payload);
  return http.send();
};

/**
 * This request is used to either add
 * one or multiple sets of enterprise data on the Ushur
 * @param  {Array} data
 * @return {Promise}      Resolves to the response of the API
 */
Ushur.prototype.addOrUpdateEnterpriseData = function (data) {
  var payload = {
    content: data,
    tokenId: this.tokenId
  };
  var http = new Http('POST', this.tokenId, 'uneda/data/add', {}, payload);
  return http.send();
};


/**
 * This API is used to fetch the enterprise data from the Ushur Platform
 * As shown there can be multiple sets of queries and responses are sent accordingly.
 * @return {Array} [description]
 */
Ushur.prototype.getEnterpriseData = function (data) {
  var payload = {
    content: data,
    tokenId: this.tokenId
  };
  var http = new Http('POST', this.tokenId, 'uneda/data/get', {}, payload);
  return http.send();
};

/**
 * Similar to the setting of enterprise
 * data this API enables deletion of the
 * enterprise from the Ushur Platform.
 * @return {Array} [description]
 */
Ushur.prototype.deleteEnterpriseData = function (data) {
  var payload = {
    content: data,
    tokenId: this.tokenId
  };
  var http = new Http('POST', this.tokenId, 'uneda/data/delete', {}, payload);
  return http.send();
};


/**
 * TThis API initiates a 2-Factor Authentication mechanism. It goes
 * with another API that will be used to confirm the code as part of
 * the mechanism.
 * @param  {Object} data Has following keys
 * phoneNumber: The credential for identifying the account.
 * callbackUrl: This is the URL of the business that Ushur will reference.
 * regCode: This represents the regional code for the phone number.(optional)
 * checkPhoneExists: This checks whether if the phone number exisits or not.(optional)
 *
 * @return {Promise}      That resolves to API response
 */
Ushur.prototype.authentication = function (data) {
  var payload = {
    tokenId: this.tokenId,
    cmd: "phoneAuthService",
    phoneNumber: data.phoneNumber,
    callbackUrl: data.callbackUrl,
    regCode: data.regCode,
    checkPhoneExists:  data.checkPhoneExists,
  };
  var http = new Http('POST', this.tokenId, 'rest/account/phoneAuthService', {}, payload);
  return http.send();
};

/**
 * This is the subsequent API to the #PhoneAuthService(authenticate)
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
Ushur.prototype.confirmation = function (data) {
  var payload = {
    tokenId: this.tokenId,
    cmd: "phoneAuthConfirm",
    phoneNumber: data.phoneNumber,
    authNumber: data.authNumber,
    phAuthTransactionId: data.phAuthTransactionId
  };
  var http = new Http('POST', this.tokenId, 'rest/account/phoneAuthConfirm', {}, payload);
  return http.send();
};

/**
 * [description]
 * @param  {Object} data An object with keys "userName", "campaignId", and callbackNum
 * @return {Promise}      A prommise that resolves to the API response
 */
Ushur.prototype.setCallbackNumber = function (data) {
  var payload = {
    token: this.tokenId,
    userName: data.userName
  };
  var http = new Http('PUT', this.tokenId, 'rest/campaign/'+ data.campaignId+'/callbackNo/'+ data.callbackNum, {}, payload);
  return http.send();
};
