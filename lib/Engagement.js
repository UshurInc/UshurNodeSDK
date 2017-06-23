'use strict';

/**
 * Used to interact with engagements
 * @param       {Object} [engagement={}] Defaults to Initialize engagement
 * @constructor
 */
function Engagement(engagement = {}) {

  /**
   * A mandatory parameter. This is the command to indicate the
   * action taken on the server. Possible values are initCampaign,
   * initBulkCampaign.
   * initCampaign will launch the campaign indicated by the
   * campaignId to the userPhoneNo indicated in the message.
   * initBulkCampaign will launch the campaign to all the users in the
   * user db associated with the enterprise indicated by the tokenId.
   * In this case the userPhoneNo is not needed in the API call.
   * @type {String}
   */
  this.cmd = engagement.cmd;

  /**
   * Mandatory for a single destination user and not necessary for a bulk campaign
   * This is the destination phone number to where this message is directed.
   * @type {String}
   */
  this.userPhoneNo = engagement.userPhoneNo;

  /**
   * A mandatory parameter. This is an identifier for an Ushur
   * structured message that will be sent out upon this request when
   * successfully completed.
   * This identifier will be published to the API caller as part of the
   * documentation process.
   * @type {String}
   */
  this.campaignId = engagement.campaignId;

  /**
   * An optional parameter. This is the phone number of the business
   * that Ushur will connect the user to for a voice call.
   * @type {String}
   */
  this.callBackNumber = engagement.callBackNumber

  /**
   * An optional parameter. This message will replace if there are any
   * contents in the initial Welcome module of the campaign/Ushur
   * being initiated. This message will be used when the initial
   * Welcome module is empty as well.
   * @type {String}
   */
  this.userMsg = engagement.userMsg;

  /**
   * This is a unique request identifier from the enterprise system. An
   * incident id from a remote service management system is an
   * example.
   * @type {String}
   */
  this.requestId = engagement.requestId;

  /**
   * Enterprise data attached
   * @type {Array}
   */
  this.data = undefined;

}

Engagement.prototype.appendEnterpriseData = function (data) {
  if(!this.data) this.data = [];
  this.data.push(data);
};

module.exports = Engagement;
