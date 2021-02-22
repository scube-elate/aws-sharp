const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

const toS3 = async (image, type, awsCredentials) => {
    return new Promise(async (resolve, reject) => {

        AWS.config.update({
            accessKeyId: awsCredentials.accessKeyId,
            secretAccessKey: awsCredentials.secretAccessKey
        });
        const s3 = new AWS.S3();
        const params = {
            Bucket: awsCredentials.bucket_name,
            Body: fs.createReadStream(image),
            Key: Date.now() + "_" + path.basename('.' + type),
            ACL: 'public-read'
        };

        s3.upload(params, function (err, data) {
            //handle error
            if (err) {
                reject(err)
            }
            //success
            if (data) {
                if (fs.existsSync(image)) fs.unlinkSync(image);
                resolve(data.Location)
            }
        });
    })
}

module.exports = {
    toS3
}