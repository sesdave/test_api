module.exports = {
    REMITA_API_URL: process.env.REMITA_API_URL,
    REMITA_API_KEY: process.env.REMITA_API_KEY,
    REMITA_SERVICE_TYPE_ID: process.env.REMITA_SERVICE_TYPE_ID,
    REMITA_MERCHANT_ID: process.env.REMITA_MERCHANT_ID,
    JWT_SECRET: '7sd!O(!@$!##!a989!!@#!@#&!^#!&3hASD987*(#*%$&',
    JWT_EXPIRES_IN: 1000*60*60*24, // 1 day in milliseconds
    MAXIMUM_NUMBER_OF_IMAGES_TO_UPLOAD: 5,
    VALID_IMAGE_FORMATS: ['jpg', 'jpeg', 'png','pdf'],
    MAX_UPLOAD_IMAGE_SIZE: 5 * 1024 * 1024, // Bytes
};
