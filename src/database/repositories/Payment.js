const models = require('../models');
const { Op } = require('sequelize');

exports.checkDuplicate = async (reference) => {
	const check = await models.Payment.findOne({
		where: { reference }
	});

	return !!check;
}

exports.create = async (data) => {
	const cleanedData = toDataBase(data);
	const newRecord = await models.Payment.create(cleanedData);

	return toDomain(newRecord);
}

exports.updateByPaymentId = async (PaymentId, data) => {
	const cleanedData = toDataBase(data);
	const response = await models.Payment.update(cleanedData, { where: { PaymentId } });

	return response;
}

exports.updateByPaymentReference = async (reference, data) => {
	const cleanedData = toDataBase(data);
	const response = await models.Payment.update(cleanedData, { where: { reference } });

	return response;
}

exports.getByPaymentId = async (paymentId) => {
	const savedRecord = await models.Payment.findOne({
		where: paymentId
	});

	return savedRecord ? toDomain(savedRecord) : null;
}

exports.getByPaymentReference = async (filter) => {
	const savedRecord = await models.Payment.findOne({
		where: filter
	});

	return savedRecord ? toDomain(savedRecord) : null;
}

exports.getSelectedPayments = async (filter = {}) => {
	// const query = getQueryParams(filter);
	const allRecords = await models.Payment.findAll({
		where: filter
	});

	return allRecords.map(toDomain);
}

// For potential clean up of data to be stored in DB
const toDataBase = data => {
	return {
		...data,
	}
}

// For potential clean up of returned data
const toDomain = data => {
	return {
		...data.dataValues,
	}
}

const getQueryParams = filter => {
	let query = {
		where: { },
		include: []
	};
	return query;
}