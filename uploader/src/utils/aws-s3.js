
const AWS = require('aws-sdk');


const filename ='/home/app/.aws/credentials';
const credentials = new AWS.SharedIniFileCredentials({ profile: 'default', filename })

const s3 = new AWS.S3(
    {
        region: 'ap-south-1',
        credentials
    }
);

async function uploadFile(file, fileName) {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: file,
    };
    
    const result = await s3.upload(params).promise();
    return result.Location;
}

module.exports = {
    uploadFile,
};