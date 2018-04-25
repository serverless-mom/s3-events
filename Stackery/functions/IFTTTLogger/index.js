var https = require('https');
var querystring = require("querystring");

// IFTTT Maker Configuration, see https://ifttt.com/maker for more info
var iftttMakerEventName = 'stackery_notification' // You can use a different IFTTT Maker EventName here
var iftttMakerSecretKey = '<YOUR IFTTT MAKER SECRET KEY>';

var iftttMakerUrl =
  'https://maker.ifttt.com/trigger/' + iftttMakerEventName + '/with/key/' +
  iftttMakerSecretKey;

exports.handler = async message  => {
  var messageString =
    `Error in node ${message.stackery.node.name} - ${message.class} - ${message.message} - stack trace: ${message.stack}`
  console.log('From Stackery:', messageString);


  // The output is send as 'value1' to IFTTT Maker
  var params = querystring.stringify({
    value1: messageString
  });

  https.get(encodeURI(iftttMakerUrl) + '?' + params, function(res) {
    console.log("Got response: " + res.statusCode);
    res.setEncoding('utf8');
    res.on('data', function(d) {
      console.log('Body: ' + d);
    });
    resolve(res.statusCode);
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
    reject(e.message);
  });
};
