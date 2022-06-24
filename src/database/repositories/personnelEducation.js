const models = require('../models');
const { Op } = require('sequelize');
const CustomError = require('../../utils/customError');

exports.create = async (data, personnelId)  => {
	const cleanedData = toDataBase(data);
	const newRecord = await models.PersonnelEducation.create({
		...cleanedData,
		personnelId: personnelId
	});

	return toDomain(newRecord);
}

exports.updateByPersonnelEducationId = async (personnelEducationId, data) => {
	const cleanedData = toDataBase(data);
	const response = await models.PersonnelEducation.update(cleanedData, { where: { personnelEducationId } });

	return response;
}

exports.getByPersonnelEducationId = async (personnelEducationId) => {
	const savedRecord = await models.PersonnelEducation.findOne({ where: { personnelEducationId } });

	return toDomain(savedRecord);
}
exports.getAllPersonnelEducationById = async(personnelId)=>{
	const savedRecords = await models.PersonnelEducation.findAll({
		where:{ personnelId }
	})
	return savedRecords.map(toDomain)
}

exports.getSelectedPersonnelEducations = async (filter = {}) => {
	const query = getQueryParams(filter);
	const allRecords = await models.PersonnelEducation.findAll(query);

	return allRecords.map(toDomain);
}

exports.deletePersonnelEducation= async(data)=>{
	const response=models.PersonnelEducation.destroy({
		where:{ personnelEducationId:data }
	})
	if(!response) throw new CustomError('Could not delete', 400);
	return true;
}

const toDataBase = data => {
	return {
		qualificationType: data.qualificationType,
		qualification: data.qualification,
		school: data.school,
		discipline: data.discipline,
		startDate: data.startDate,
		endDate: data.endDate,
		certificate: data.certificate
	}
}

const toDomain = data => {
	if (!data) return null;
	
	const d = {
		personnelEducationId: data.personnelEducationId,
		personnelId: data.personnelId,
		qualification: data.qualification,
		qualificationType: data.qualificationType,
		school: data.school,
		discipline: data.discipline,
		startDate: data.startDate,
		endDate: data.endDate,
		certificate: data.certificate
	}

	return d;
}

const getQueryParams = filter => {
	let query = {
		where: {},
		include: []
	};
	if (filter.status) query.where.status = filter.status;

	return query;
}