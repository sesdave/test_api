const models = require('../models');

exports.create = async data => {
	const cleanedData = toDataBase(data);
	const newRecord = await models.Regulation.create(cleanedData);

	return toDomain(newRecord);
}

exports.updateByRegulationId = async (regulationId, data) => {
	const cleanedData = toDataBase(data);
	const response = await models.Regulation.update(cleanedData, { where: { regulationId } });

	return response;
}

exports.getByRegulationId = async (regulationId) => {
	const savedRecord = await models.Regulation.findOne({
		where: { regulationId }
	});

	return savedRecord ? toDomain(savedRecord) : null;
}

exports.getSelectedRegulations = async (filter = {}) => {
	const query = getQueryParams(filter);
	const allRecords = await models.Regulation.findAll(query);

	return allRecords.map(toDomain);
}

const toDataBase = data => {
	return {
		...data
	}
}

const toDomain = data => {
	return {
		...data
	};
}

const getQueryParams = filter => {
	let query = {
		where: { },
		include: []
	};
	return query;
}