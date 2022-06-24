const models = require('../models')
const { Op, QueryTypes } = require('sequelize')
const { sequelize } = require('../models')

exports.personnelStatus = {
	Pending: 'Pending',
	PendingVetting: 'PendingVetting',
	Vetted: 'Vetted',
	Approved: 'Approved',
	Activated: 'Activated'
}

exports.create = async (data) => {
	console.log('entered data', data);
	const cleanedData = toDataBase(data)
	const newRecord = await models.Personnel.create({
		...cleanedData,
		registrationDate: Date.now(),
		userId: data.userId,
	})

	return toDomain(newRecord)
}

exports.getByAdminStates = async (adminId) => {
	const admin = await models.Admin.findOne({
		where: { adminId },
		include: [models.State],
	})
	if (!admin) return []

	const personnels = await models.Personnel.findAll({
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
			models.PersonnelEducation,
			models.PersonnelExpatriate,
			models.PersonnelWorkExperience,
			models.PersonnelMembership,
			models.State,
		],
	})

	return personnels.map((p) => {
		const data = p.dataValues
		data.documents = data.User.Documents
		delete data.User
		return data
	})
}

exports.updateByPersonnelId = async (personnelId, data) => {
	//console.log(' data', data)
	const cleanedData = toDataBase(data)
	//console.log('cleaned data', cleanedData)
	delete cleanedData.email
	delete cleanedData.phone
	delete cleanedData.alt_phone

	const response = await models.Personnel.update(cleanedData, {
		where: { personnelId },
	})

	return response
}

exports.getByUserId = async (userId) => {
	const savedRecord = await models.Personnel.findOne({
		where: { userId },
		order: [['createdAt', 'desc']],
	})

	return savedRecord ? toDomain(savedRecord) : null
}

exports.getByPersonnelId = async (personnelId) => {
	const savedRecord = await models.Personnel.findOne({
		where: { personnelId },
	})
	//console.log('saved record', savedRecord)
	return savedRecord ? toDomain(savedRecord) : null
}

exports.getSelectedPersonnels = async (filter = {}) => {
	console.log('filer', filter);
	const query = getQueryParams(filter)
	const allRecords = await models.Personnel.findAll(query)
	//console.log('allrecords', allRecords.map(toDomain))
	return allRecords.map(toDomain)
}
//select * from fix_finance f where type=1 and id not in (select payment_type from payments p where f.id=p.payment_type);
exports.getOwingPersonnel=async(user)=>{
	const savedPersonnel=await this.getByPersonnelId(user.profileId)
	console.log('user', user.userId);
	const today = new Date();
	const allRecords= await sequelize.query('select * from PersonnelFees pf where engineering_base=? and fee_item_id=? and personnel_cat_id=? and  year between ? and ? and  personnel_fee_id not in (select personnel_fee_id from Payments p where user_id=? and pf.personnel_fee_id=p.personnel_fee_id)',{	
		raw:true,
		replacements:[savedPersonnel.engineeringBase, 1, savedPersonnel.personnelCatId,savedPersonnel.registrationDate.getFullYear(), today.getFullYear(), user.userId],
		type:QueryTypes.SELECT
	});
	return allRecords;
}

const toDataBase = (data) => {
	console.log('catid', data.applicationStatus)
	//console.log('lastName', data.lastName)
	return {
		profileImage: data.profileImage,
		firstName: data.firstName,
		lastName: data.lastName,
		otherNames: data.otherNames,
		personnelCatId: data.personnelCatId,
		engineeringBase: data.engineeringBase,
		engineeringField: data.engineeringField,
		isCorenMember: data.isCorenMember,
		applicationStatus: data.applicationStatus,
		email: data.email,
		phone: data.phone,
		alt_phone: data.alt_phone,
		address: data.address,
		contactCity: data.contactCity,
		contactState: data.contactState,
		contactCountry: data.contactCountry,
		practiceCity: data.practiceCity,
		practiceState: data.practiceState,
		practiceCountry: data.practiceCountry,
		sex: data.sex,
		dob: data.dob,
		originLGA: data.originLGA,
		originState: data.originState,
		originCountry: data.originCountry,
		about: data.about,

		proposer1: data.proposer1,
		proposer2: data.proposer2,
		liveAndWorkInNigeria: data.liveAndWorkInNigeria,
		isProfessionalBodyMember: data.isProfessionalBodyMember,
		stateId: data.stateId,
	}
}

const toDomain = (data) => {
	const d = {
		userId: data.userId,
		personnelId: data.personnelId,
		profileImage: data.profileImage,
		firstName: data.firstName,
		lastName: data.lastName,
		otherNames: data.otherNames,
		personnelCategory: data.personnelCategory,
		personnelCatId:data.personnelCatId,
		engineeringBase: data.engineeringBase,
		engineeringField: data.engineeringField,
		isCorenMember: data.isCorenMember,
		applicationStatus: data.applicationStatus,

		email: data.email,
		phone: data.phone,
		alt_phone: data.alt_phone,
		address: data.address,
		contactCity: data.contactCity,
		contactState: data.contactState,
		contactCountry: data.contactCountry,
		practiceCity: data.practiceCity,
		practiceState: data.practiceState,
		practiceCountry: data.practiceCountry,
		sex: data.sex,
		dob: data.dob,
		originLGA: data.originLGA,
		originState: data.originState,
		originCountry: data.originCountry,
		about: data.about,

		proposer1: data.proposer1,
		proposer2: data.proposer2,
		liveAndWorkInNigeria: data.liveAndWorkInNigeria,
		isProfessionalBodyMember: data.isProfessionalBodyMember,
		state: data.State,
		registrationDate:data.registrationDate
	}

	return d
}

const getQueryParams = (filter) => {
	let query = {
		where: {},
		include: [],
	}
	if (filter.status) query.where.applicationStatus = filter.status

	return query
}
