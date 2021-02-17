## Installation

`npm install aws-sharp -s`

## Features

 * Upload Images to AWS S3 with compressed  size without loosing Quality.
 * It should supported to JPG,PNG,JPEG WEBP.
 * Forced to save image into required format.
 * Provide  Image Quality Option While compressing.


## Synopsis

### Create a AWSClient

```js
var aws_sharp = require('aws-sharp');

var AWSClient = aws_sharp.createCredentials({
  s3Credentials: {
    accessKeyId: "your s3 key",
    secretAccessKey: "your s3 secret"
  },
});
```

### Upload a Image to S3

```js
const options : {
    toFile:"string" // force to convert into required image format,
    quality:Number  // provide quality while compressimage, max allowed to 80
}
var params = {
    "Base64 Image",
    "Bucket Name",
    options
  },
};

AWSClient.uploadBase64ImageWithCompress(params).then(s3_path=>{
    console.log(s3_path)
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
 *  `options` : (optional)`toFile`: Force to save to particular format ['png','jpeg','jpg','webp']   default set to `webp`.
 * `quality` parameter in `sharp`, set qaulity while compress default set to `20` Max allowed to `80`


## Examples

### Upload Base64 Image to S3 with compress size without loose quality


```js
var AWSClient = require('aws-sharp').createCredentials({ /* AWS KEYS */ });
AWSClient.uploadBase64ImageWithCompress(params).then(s3_path=>{
   console.log('S3_Path',s3_path)
}).catch(error=>{
    console.log("Error", error)
})
```

## Testing

create .env file in root folder and set following keys.

`AWS_S3_KEY_ID=<valid_s3_key> AWS_S3_SECRET=<valid_s3_secret> AWS_S3_BUCKET=<valid_s3_bucket> npm test`


