let AWS = require('aws-sdk');
let lambda = new AWS.Lambda();

exports.handler = (event) => {
    return new Promise((resolve, reject) => {
        lambda.getAccountSettings(event)
        .then((data) => {
            resolve data;
        })
        .catch(reject);
     });
};