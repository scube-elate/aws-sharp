const AWS = require('aws-sdk');
const path = require('path')
const fs = require('fs')

const utils = require('./helpers');
const folderPath = __dirname + '/uploads/'; // temp  folder path
var MAX_FILE_SIZE = 50 * 1024 * 1024;  // Set default max file size
/**
 * set Credentails of AWS
 * params:
 *  - s3Credentials:
 *    - Bucket: String,
 *    - accessKeyId: String,
 *    - secretAccessKey: String,
 *    - compressQuality:Number
 *    - compressToFile:String
 *
 * @return instance of AWSClient method
 */
exports.createCredentials = function (options) {
  return new AWSClient(options);
};


function AWSClient(options) {
  options = options || {};
  this.s3Credentials = options.s3Credentials || new AWS.S3(options.awsCredentials);
}



AWSClient.prototype.uploadBase64ImageWithCompress = function (base64Data = '', bucket_name = '', compressOptions = {}) {
  return new Promise(async (resolve, reject) => {
    if (await utils.checkValidImageOrNot(base64Data) && this.s3Credentials) {
      const type = base64Data.split(';')[0].split('/')[1];
      var matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      var base64Image = matches[2];
      const fileName = new Date().getTime();
      const imagePath = folderPath + fileName + '.' + type
      fs.writeFile(imagePath, base64Image, 'base64', async (err) => {
        if (!err) {
          this.s3Credentials['bucket_name'] = bucket_name
          const path = await utils.compressedUploadtoS3(imagePath, type, this.s3Credentials, compressOptions)
          resolve(path)
        }
      })
    } else {
      reject({ message: !this.s3Credentials ? "aws Credentials not provides" : "Empty image provided" })
    }
  })
};

async function checkFolderExits() {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true })
  }
}


checkFolderExits();
exports.AWSClient = AWSClient;
exports.AWS = AWS;
exports.MAX_FILE_SIZE = MAX_FILE_SIZE;
