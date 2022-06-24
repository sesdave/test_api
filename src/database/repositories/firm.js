const models = require('../models')
const { Op } = require('sequelize')

exports.firmStatus = {
	Pending: 'Pending',
	PendingVetting: 'PendingVetting',
	Vetted: 'Vetted',
	Approved: 'Approved',
}

exports.create = async (data) => {
	const cleanedData = toDataBase(data)
	const newRecord = await models.Firm.create({
		...cleanedData,
		registrationDate: Date.now(),
		userId: data.userId,
	})

	return toDomain(newRecord)
}

exports.updateByFirmId = async (firmId, data) => {
	const cleanedData = toDatabase(data)
	const response = await models.Firm.update(cleanedData, {
		where: { firmId },
	})

	return response
}

exports.getByUserId = async (userId) => {
	const savedRecord = await models.Firm.findOne({
		where: { userId },
		order: [['createdAt', 'desc']],
	})

	return savedRecord ? toDomain(savedRecord) : null
}

exports.getByFirmId = async (firmId) => {
	const savedRecord = await models.Firm.findOne({ where: { firmId } })

	return savedRecord ? toDomain(savedRecord) : null
}

exports.getSelectedFirms = async (filter = {}) => {
	const query = getQueryParams(filter)
	const allRecords = await models.Firm.findAll(query)

	return allRecords.map(toDomain)
}

exports.getByAdminStates = async (adminId) => {
	const admin = await models.Admin.findOne({
		where: { adminId },
		include: [models.State],
	})
	if (!admin) return []
	const firms = await models.Firm.findAll({
		where: {
			stateId: {
				[Op.in]: admin.States.map((s) => s.stateId),
			},
		},
		include: [
			{
				model: models.User,
				include: [models.Document],
			},
			models.FirmBranch,
			models.FirmOwnership,
			models.FirmPersonnel,
			models.FirmProject,
			models.FirmService,
			models.FirmSpecialization,
			models.State,
		],
	})

	console.log({ firms })
	return firms.map((f) => {
		const data = f.dataValues
		data.documents = data.User.Documents
		delete data.User
		return data
	})
}

const toDataBase = (data) => {
	return {
		imageUrl: data.imageUrl,
		firmName: data.firmName,
		firmType: data.firmType,
		yearEstablished: data.yearEstablished,
		yearOfIncorporation: data.yearOfIncorporation,
		rcNumber: data.rcNumber,
		rcRegType: data.rcRegType,
		rcRegYear: data.rcRegYear,
		applicationStatus: data.applicationStatus,
		email: data.email,
		phone: data.phone,
		practiceState: data.practiceState,
		address: data.address,
		firmCategory: data.firmCategory,
		firmSize: data.firmSize,
		consultingRegType: data.consultingRegType,
		formerName: data.formerName,
		formerYearEstablished: data.formerYearEstablished,
		practiceCountry: data.practiceCountry,
		applicationStatus: data.applicationStatus,
		stateId: data.stateId,
	}
}

const toDomain = (data) => {
	const d = {
		userId: data.userId,
		firmId: data.firmId,
		imageUrl: data.imageUrl,
		firmName: data.firmName,
		firmType: data.firmType,
		yearEstablished: data.yearEstablished,
		yearOfIncorporation: data.yearOfIncorporation,
		rcNumber: data.rcNumber,
		rcRegType: data.rcRegType,
		rcRegYear: data.rcRegYear,
		applicationStatus: data.applicationStatus,
		email: data.email,
		phone: data.phone,
		practiceState: data.practiceState,
		address: data.address,
		firmCategory: data.firmCategory,
		firmSize: data.firmSize,
		consultingRegType: data.consultingRegType,
		formerName: data.formerName,
		formerYearEstablished: data.formerYearEstablished,
		practiceCountry: data.practiceCountry,
		applicationStatus: data.applicationStatus,
		state: data.State,
	}

	return d
}

const getQueryParams = (filter) => {
	let query = {
		where: {},
		include: [],
	}
	if (filter.status) query.where.status = filter.status

	return query
}
