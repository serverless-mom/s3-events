let AWS = require('aws-sdk');
let lambda = new AWS.Lambda();

exports.handler = async (event) => {
    return await lambda.getAccountSettings().promise() ;
};