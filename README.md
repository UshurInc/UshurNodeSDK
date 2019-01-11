# Ushur

A node.js client to interact with Ushur API

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Requires node.js version 6.9.5 or higher


### Installing

Just use npm to install the package

```
npm install ushur --save
```

### Usage

#### Authenticate
First thing you need to do is login to the API using either event style or promise style.
The URL itself is configured under lib/config.
The login shown below is under examples/auth.js.
To use specific URL/host use hostname field as shown below:
```
var Ushur = require('ushur').Ushur;

var ushur = new Ushur({
  email: "user@example.com",
  password: "examplePassword",
  hostname: "https://apidev.ushur.me/" //optional
});

ushur.on('loginSuccess', function (userData) {
  console.log(userData);
});

ushur.on('loginFalure', function (error) {
  console.log(error);
});
```
or
```
var Ushur = require('ushur').Ushur;

var ushur = new Ushur({
  email: "user@example.com",
  password: "examplePassword",
  mode: "promise",
  hostname: "https://apidev.ushur.me/" //optional
 })
 .then(function(userData){
   //Login Success
   console.log(userData);
 })
 .catch(function(error){
   //login failed
   console.log(error);
 });
```
Initiating a new engagement
```
var Engagement = require('ushur').Engagement;

ushur.on('loginSuccess', function (userData) {
  //Initialize an ushur

  var engagement = new Engagement({
    userPhoneNo: "+16614187487",
    campaignId: "UshurIncidentCreator",
  });

  ushur.initEngagement(engagement)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

});
```
Initiating a new engagement with enterprise data
```
var engagement = new Engagement({
  userPhoneNo: "+16132131112",
  campaignId: "UshurIncidentCreator",
});

engagement.appendEnterpriseData({
  "phone":"12098746734",
  "status": "shipping in progress",
  "prescriptionId":"PId8888",
  "orderId": "order-842918888"
});

engagement.appendEnterpriseData({
  "phone":"1241413312",
  "status": "Something else in progress",
  "prescriptionId":"PId8889",
  "orderId": "order-842918888"
});

ushur.initEngagement(engagement)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```
ushur.initEngagement

* Initiate Any Campaign
* Notify a Message
* Initiate Campaign With a Request Id
* Initiate Campaign With Enterprise Data

Get Detailed Responses For a Request Id
```
var options = { requestId: "INC700001" , campaignId:"ResConfV2_Ushur"}
ushur.getResponses(options)
.then(function (res) {
  console.log(res);
})
.catch(function (err) {
  console.log(err);
});
```
Get Tagged Responses For a Request Id
```
var options = {
  requestId: "INC700001" ,
  campaignId:"ResConfV2_Ushur",
  UeTag: "UeTag_StatusCheck,UeTag_RecommendationRating,UeTag_SatisfactionRating,UeTag_FeedbackComment"
  /*
  Or
  UeTag: [
    "UeTag_StatusCheck" ,
    "UeTag_RecommendationRating",
    "UeTag_SatisfactionRating",
    "UeTag_FeedbackComment"
    ]
  */
};
ushur.getResponses(options)
.then(function (res) {
  console.log(res);
})
.catch(function (err) {
  console.log(err);
});
```
Query Filters
```
var options = {
  requestId: "INC700001",
  campaignId:"ResConfV2_Ushur",
  filterCmd:"getCounts,getSids"
  /*
  Or
  filterCmd: ["getCounts", "getSids"]
   */
}
ushur.getResponses(options)
.then(function (res) {
  console.log(res);
})
.catch(function (err) {
  console.log(err);
});
```
Add or Update Enterprise Data on Ushur
```
var data = [];

data.push({
      "phone":"12098746734",
      "status": "shipping in progress",
      "prescriptionId":"PId8888",
      "orderId": "order-842918888"
    });

data.push({
      "phone":"16614187487",
      "status": "processing",
      "prescriptionId":"PId8978",
      "orderId": "order-967888884"
    });

ushur.addOrUpdateEnterpriseData(data)
  .then(function(res){
    console.log(res);
  })
  .catch(function(err){
    console.log(err);
  });
```
Get Enterprise Data on Ushur
```
var queries = [];
queries.push({
      "prescriptionId":"PId8888",
      "orderId": "order-842918888"
    });
queries.push({
      "prescriptionId":"PId8978"
    });
ushur.getEnterpriseData(queries)
  .then(function(res){
      console.log(res);
    })
  .catch(function(err){
      console.log(res);
    });
```
Delete Enterprise Data on Ushur
```
var data = [];

data.push({
      "phone":"12098746734",
      "status": "shipping in progress",
      "prescriptionId":"PId8888",
      "orderId": "order-842918888"
    });

data.push({
      "phone":"16614187487",
      "status": "processing",
      "prescriptionId":"PId8978",
      "orderId": "order-967888884"
    });

ushur.deleteEnterpriseData(data)
  .then(function(res){
      console.log(res);
    })
  .catch(function(err){
      console.log(res);
    });
```
Authenticating a phone number
```
var data = {
  phoneNumber: "+12312111231",
};

ushur.authentication(data)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```
and subsequent confirmation of the number
```
var data = {
  phoneNumber: "+16614187487",
  authNumber: "12311",
  phAuthTransactionId:"3c055082-df38-4ae4-9cbd-cead56aa140e-1454540458974"
};

ushur.confirmation(data)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
```
