## Installation

`npm install aws-sharp -S`

## Features

 * Upload Images to AWS S3 with compressed  size with loosing Quality.
 * It should supported to JPG,PNG,JPEG.
 * Forced to save image into required format.
 * Provide  Image Quality Option While Compress.


## Synopsis

### Create a client

```js
var aws_sharp = require('aws-sharp');

var AWSClient = aws_sharp.createCredentials({
  s3Credentials: {
    accessKeyId: "your s3 key",
    secretAccessKey: "your s3 secret"
  },
});
```

### Upload a file to S3

```js
const options : {
    fileTo:"string" // force to convert into required image format,
    quality:Number  // quality while compress image max allowed to 80
}
var params = {
    "Base64 Image",
    "Bucket Name",
    options
  },
};

AWSClient.uploadBase64ImageWithCompress(params).then(path=>{
    console.log(path)
}).catch(error=>{
    console.log(error)
})
```

## API Documentation


This contains a reference to the aws-sdk and sharp module. It is a valid use case to use
both this module and the lower level aws-sdk module in tandem.

### aws_sharp.createCredentials(options)

Creates an S3 client.

`options`:

 * `s3Credentials` - optional, an instance of `AWS.S3`. Leave blank if you set aws-cli configuration .




### aws_sharp.uploadBase64ImageWithCompress(params)

See http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property

`params`:

 * `base64Image`: base64 image string passes as argument.
 * `bucketName`: bucket name  to the save file on particualr s3 bucket.
 *  `options` : (optional)`toFile`: Force to save to particular format ['png','jpeg','jpg','webp']   default set to `webp`
                `quality` parameter in `sharp`, set qaulity while compress default set t0 `20` Max allowed to `80`


## Examples

### Check if a file exists in S3


```js
var AWSClient = require('aws-sharp').createCredentials({ /* AWS KEYS */ });
AWSClient.uploadBase64ImageWithCompress(params).then(path=>{
   console.log('aws Path',path)
}).catch(error=>{
    console.log("Error": error)
})
```

## Testing

if Want to test this npm need to create .env file in root folder and set following keys.

`AWS_S3_KEY_ID=<valid_s3_key> AWS_S3_SECRET=<valid_s3_secret> AWS_S3_BUCKET=<valid_s3_bucket> npm test`


