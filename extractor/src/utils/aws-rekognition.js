const AWS = require('aws-sdk');

const filename ='/home/app/.aws/credentials';
const credentials = new AWS.SharedIniFileCredentials({ profile: 'default', filename })

const Rekognition = new AWS.Rekognition(
    {
        region: 'ap-south-1',
        credentials
    }
);


module.exports = Rekognition;