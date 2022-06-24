const models = require('../models')
const { Op } = require('sequelize')
const tokens = require('../../utils/tokens')

exports.checkDuplicate = async (data) => {
	const check = await models.User.findOne({
		where: {
			[Op.or]: [
				{ email: { [Op.iLike]: data.email } },
				{ phone: data.phone },
			],
		},
	})
	return !!check
}

exports.create = async (data) => {
	const cleanedData = toDataBase(data)
	console.log({ cleanedData })
	const newRecord = await models.User.create(
		{
			...cleanedData,
			password: await tokens.makeHash(data.password),
		},
		{ include: [models.Document] }
	)

	return toDomain(newRecord)
}

exports.updateByUserId = async (data) => {
	//const cleanedData = toDatabase(data)
	const response = await models.User.update(data, {
		where: { userId: data.userId },
	})

	return response
}

exports.findByUserId = async (userId) => {
	const savedRecord = await models.User.findOne({
		where: { userId },
		include: [models.Personnel, models.Firm, models.Admin],
	})

	return savedRecord ? toDomain(savedRecord) : null
}

exports.getLastRCNumber=async()=>{
	const RcRecord= await models.User.findAll({
		limit:1,
		where: {
			corenNumber:{
				[Op.not]: null
				//[Op.is]:null
			}
		},
		order: [ [ 'createdAt', 'DESC' ]]
	})
//	console.log("dabase", RcRecord);
	return RcRecord;
}

exports.findByEmailOrPhoneAndPassword = async (emailOrPhone, password) => {
	const savedRecord = await models.User.findOne({
		where: {
			[Op.or]: [
				{ email: { [Op.iLike]: emailOrPhone } },
				{ phone: emailOrPhone },
			],
		},
		include: [
			models.Document,
			{
				model: models.Personnel,
				include: [
					models.PersonnelEducation,
					models.PersonnelExpatriate,
					models.PersonnelWorkExperience,
					models.PersonnelMembership,
					models.State,
				],
			},
			{
				model: models.Firm,
				include: [
					models.FirmBranch,
					models.FirmOwnership,
					models.FirmPersonnel,
					models.FirmProject,
					models.FirmService,
					models.FirmSpecialization,
					models.State,
				],
			},
			{
				model: models.Admin,
				include: [
					{
						model: models.Role,
						include: [
							{
								model: models.Permission,
							},
						],
					},
					models.State,
				],
			},
		],
	})

	if (!savedRecord) return null

	const isPasswordVerified = await tokens.checkHash(
		savedRecord.password,
		password
	)
	if (!isPasswordVerified) return null

	return toDomain(savedRecord)
}

exports.getSelectedUsers = async (filter = {}) => {
	const query = getQueryParams(filter)
	const allRecords = await models.User.findAll(query)

	return allRecords.map(toDomain)
}

const toDataBase = (data) => {
	return {
		phone: data.phone,
		email: data.email,
		userType: data.userType,
		token: data.token,
		lastSeen: data.lastSeen,
		status: data.status,
		Documents: data.documents,
	}
}

const toDomain = (data) => {
	let d = {
		userId: data.userId,
		corenNumber:data.corenNumber,
		phone: data.phone,
		email: data.email,
		userType: data.userType,
		token: data.token,
		lastSeen: data.lastSeen,
		status: data.status,
		documents: data.Documents,
	}
	if (data.userType == 'Personnel' && data.Personnel) {
		d = { ...d, ...data.Personnel.dataValues }
	}
	if (data.userType == 'Firm' && data.Firm)
		d = { ...d, ...data.Firm.dataValues }
	if (data.userType == 'Admin' && data.Admin) {
		const admin = data.Admin.dataValues
		// admin.permissions = admin.Roles.reduce(
		// 	(acc, cur) => [...acc, ...cur.Permissions.map((p) => p.name)],
		// 	[]
		// )

		// admin.roles = admin.Roles.map((r) => ({
		// 	roleId: r.roleId,
		// 	name: r.name,
		// }))

		// admin.states = admin.States

		// delete admin.Roles
		// delete admin.States
		d = { ...d, ...admin }
	}

	if (d.userType === 'Admin') {
		delete d.documents
	}
	return d
}

const getQueryParams = (filter) => {
	let query = {
		where: {},
		include: [],
	}
	if (filter.userType) query.where.userType = filter.userType
	if (filter.status) query.where.status = filter.status

	return query
}
