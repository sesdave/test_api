const config = require('../../config/sysConfig');
const axios = require('axios').default;
const cryptoJS = require('crypto-js');
const Base64 = require('crypto-js/enc-base64');
const CustomError = require('../../utils/customError');

const Remita = {
	verifyPayment: async (reference) => {
		const apiHash = cryptoJS.SHA512(reference + config.REMITA_API_KEY + config.REMITA_MERCHANT_ID);
		const config_ = {
			method: 'get',
			url: `${config.REMITA_API_URL}/ecomm/${config.REMITA_MERCHANT_ID}/${reference}/${apiHash}/status.reg`,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `remitaConsumerKey=${config.REMITA_MERCHANT_ID},remitaConsumerToken=${apiHash}`
			},
		}
		let result = {};
		await axios(config_)
		.then(response => {
			result = response.data;
		})
		.catch(function (error) {
		  	result = error.response.data;
		});
		return result;
	},
	initializePayment: async (data) => {
		data.serviceTypeId = config.REMITA_SERVICE_TYPE_ID;
		const apiHash = cryptoJS.SHA512(config.REMITA_MERCHANT_ID + config.REMITA_SERVICE_TYPE_ID + data.orderId + data.amount + config.REMITA_API_KEY);
		
		const config_ = {
			url: `${config.REMITA_API_URL}/exapp/api/v1/send/api/echannelsvc/merchant/api/paymentinit`,
			headers: { 
				'Content-Type': 'application/json',
				'Authorization': `remitaConsumerKey=${config.REMITA_MERCHANT_ID},remitaConsumerToken=${apiHash}`
			},
			method: 'post',
			data: JSON.stringify(data),
			
		}
		console.log('remita data', data)
		let result = {};
		await axios(config_)
		.then(function (response) {
			result = JSON.parse(response.data.split(/[()]/)[1]);
		})
		.catch(function (error) {
			throw new CustomError(error, 400);
		});
		return result;
	}
}

module.exports = Remita;