const expect = require('chai').expect;
const assert = require('chai').assert;
const path = require('path');
const validImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='
const filePath = path.join(__dirname, '../uploads/test.jpeg')
const AWS_S3 = require('../../lib/index')
const dotenv = require('dotenv').config();
if (dotenv.error) {
  console.trace('.env file is missing');
  process.exit(0);
}

describe('COMPRESS AND UPLOAD IMAGE', () => {

    it('Should return keys  if given args are complete', () => {
      const givenCredentials = {
        s3Credentials: {
          accessKeyId: process.env.AWS_S3_KEY_ID,
          secretAccessKey: process.env.AWS_S3_SECRET
        }
      }
      const credentials = AWS_S3.createCredentials(givenCredentials)
      expect(
        credentials.s3Credentials,
        'The credentials data should be taken from given data object'
      ).to.deep.equal(givenCredentials.s3Credentials)

    })


    it('Should return null if given args are empty', () => {
      const givenCredentials = {}
      const credentials = AWS_S3.createCredentials(givenCredentials)
      expect(credentials.s3Credentials.config.credentials).to.equal(null)

    })


    it('Should throw error  if image are not given', async () => {
      const AWSClient = AWS_S3.createCredentials({});
      return await AWSClient.uploadBase64ImageWithCompress().then(data => {

      }).catch(err => {
        expect(err.message).to.be.equal('Empty image provided')

      })
    })

    it('Should return  path  if valid data is provided', async () => {
      const givenCredentials = {
        s3Credentials: {
          accessKeyId: process.env.AWS_S3_KEY_ID,
          secretAccessKey: process.env.AWS_S3_SECRET
        }
      }
      const AWSClient = AWS_S3.createCredentials(givenCredentials);
      return  await AWSClient.uploadBase64ImageWithCompress(validImage, process.env.AWS_S3_BUCKET, { fileTo: "png", quality: 50 }).then(data => {
      }).catch(err => {
        expect(err.message).to.be.equal('Empty image provided')
      })
    })

    it('Should throw   err  if invalid  data is provided', async () => {
      const givenCredentials = {
        s3Credentials: {
          accessKeyId: process.env.AWS_S3_KEY_ID,
          secretAccessKey: process.env.AWS_S3_SECRET
        }
      }
      const AWSClient = AWS_S3.createCredentials(givenCredentials);
      return  await AWSClient.uploadFileWithCompress(filePath, process.env.AWS_S3_BUCKET).then(data => {
      }).catch(err => {
        expect(err.message).to.be.equal('Empty image provided')
      })
    })
})
