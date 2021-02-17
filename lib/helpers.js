const sharp = require('sharp');
const path = require('path');
const utlis = require('./s3');
const fs = require('fs');
const DEFAULT_COMPRESS_QUALITY = 20;


const checkValidImageOrNot = async (image) => {
    let isValid = false;
    const isString = (typeof image === 'string' || image instanceof String);

    if (!isString) {
        let invalidType;
        if (image === null) {
            invalidType = 'null';
        } else {
            invalidType = typeof image;
            if (invalidType === 'object' && image.constructor && image.constructor.hasOwnProperty('name')) {
                invalidType = image.constructor.name;
            } else {
                invalidType = `a ${invalidType}`;
            }
        }

        return false
    }


    const type = image.split(';')[0].split('/')[1];
    var matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    let validImage = (type && matches.length > 1) ? true : false


    if (validImage) {
        var base64Image = matches[2];
        var notBase64 = /[^A-Z0-9+\/=]/i;

        const len = base64Image.length;
        if (!len || len % 4 !== 0 || notBase64.test(base64Image)) {
            return false;
        }
        const firstPaddingChar = base64Image.indexOf('=');
        return firstPaddingChar === -1 ||
            firstPaddingChar === len - 1 ||
            (firstPaddingChar === len - 2 && base64Image[len - 1] === '=');
    }


    return isValid

}

const compressedUploadtoS3 = async (image, type, awsCredentials, options) => {
    const folderPath = __dirname + '/uploads/'; // temp  folder path
    const fileName = new Date().getTime();
    const imageType = (options && options.toFile) || type
    const quality = (options && options.quality) || DEFAULT_COMPRESS_QUALITY
    const imagePath = folderPath + fileName + '.' + imageType;
    return await sharp(image)
        .webp({
            compressionLevel: 9,
            adaptiveFiltering: true,
            force: false,
            quality: quality
        })
        .png({
            compressionLevel: 9,
            adaptiveFiltering: true,
            force: false,
            quality: quality
        })
        .jpeg({
            quality: quality,
            chromaSubsampling: '4:4:4',
            force: false,
        })
        .withMetadata()
        .toFile(imagePath).then(async (data) => {
            if (fs.existsSync(image)) fs.unlinkSync(image);
            return await utlis.toS3(imagePath, imageType, awsCredentials);
        });;
}

module.exports = {
    checkValidImageOrNot,
    compressedUploadtoS3

};