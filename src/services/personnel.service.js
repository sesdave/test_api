const personnelRepository = require('../database/repositories/personnel');
const userRepository= require('../database/repositories/user')
const CustomError = require('../utils/customError');
const utilHelper= require('../utils/helpers')
const { personnelStatus } = require('../database/repositories/personnel')

exports.create = async (data, user = {}) => {
	const createData = preparePersonnelData(data, user)
	const savedRecord = await personnelRepository.create(createData)

	return savedRecord
}

exports.updateByPersonnelId = async (personnelId, data, user) => {
	const updateData = preparePersonnelData(data, user)
	const response = await personnelRepository.updateByPersonnelId(
		personnelId,
		updateData
	)
	if (!response) throw new CustomError('Personnel record not found!', 404)

    if (data.applicationStatus) await logTreatmentData({ ...data, personnelId }, user);

	return true
}

exports.getByPersonnelId = async (personnelId, user) => {
	const savedRecord = await personnelRepository.getByPersonnelId(personnelId)
	if (!savedRecord) throw new CustomError('Personnel record not found!', 404)

	return savedRecord
}

exports.getByAdminStates = async (adminId, user) => {
	const results = await personnelRepository.getByAdminStates(adminId)
	return results
}

exports.getSelectedPersonnels = async (filter) => {
    const query = getQueryParams(filter);
    const result = await personnelRepository.getSelectedPersonnels(query);

	return result
}
exports.approveToActivateAfterPayment=async(req)=>{
    //get last user with rc number
    const preRCNumber= await userRepository.getLastRCNumber()
   // console.log('receive rc number', preRCNumber);
    console.log('correct rc number', preRCNumber[0].dataValues.corenNumber);
    //generate new rc number
    let RcNumber=preRCNumber[0].dataValues.corenNumber;
    //if (RcNumber!=null)
    let genRcNumber=RcNumber==null?'RC1000': await utilHelper.generateRcNumber(RcNumber);
    console.log('converted rc number', genRcNumber);
    //update rc number and status
    await userRepository.updateByUserId({
        corenNumber:genRcNumber,
        userId:'d7c9696c-4afa-4fe9-9c9c-4d179d2430af'
    })
    console.log('application', personnelStatus.Activated)
    const response = await personnelRepository.updateByPersonnelId(req.params.personnelId, {
        applicationStatus: personnelStatus.Activated,
        isCorenMember:true
    });
    if (!response) throw new CustomError('Personnel record not found!', 404);
    /*await updateByPersonnelId(req.params.personnelId,
        {
            applicationStatus: personnelStatus.Activated,
        },
        req.user
    )*/
    return true

}

const getQueryParams = (filter) => {
	return filter
}

const logTreatmentData = async (data, user) => {
	const treatmentLogRepository = require('../database/repositories/treatmentLog')
	const isAdminRequest = user.permission && user.permission != ''
	let adminId = null,
		applicantType = 'Personnel',
		submittedAt = Date.now(),
		treatedAt = null,
		reason = '* Submitted By Applicant *'

	if (isAdminRequest) {
		const lastApplicantLog =
			await treatmentLogRepository.getLastSubmittedLog(
				data.personnelId,
				applicantType
			)

		adminId = user.profileId
		submittedAt = lastApplicantLog.submittedAt
		treatedAt = Date.now()
		reason = data.reason || null
	}

	const logPayload = {
		applicationStatus: data.applicationStatus,
		personnelId: data.personnelId,
		applicantType,
		reason,
		submittedAt,
		treatedAt,
		adminId,
	}
	await treatmentLogRepository.create(logPayload)
}

const preparePersonnelData = (data) => {
	const d = {
		userId: data.userId,
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
		professionalMembershipNumber: data.professionalMembershipNumber,
		professionalBody: data.professionalBody,

		stateId: data.stateId,
	}

	// This is set according to the workflow of the Registration
	if (data.hasOwnProperty('liveAndWorkInNigeria')) {
		if (
			data.liveAndWorkInNigeria == false ||
			data.liveAndWorkInNigeria == 'false'
		) {
			d.isProfessionalBodyMember = false
			d.professionalBody = null
			d.professionalMembershipNumber = null
		} else if (
			data.liveAndWorkInNigeria == true ||
			data.liveAndWorkInNigeria == 'true'
		) {
			if (
				data.isProfessionalBodyMember == false ||
				data.isProfessionalBodyMember == 'false'
			) {
				d.isProfessionalBodyMember = false
				d.professionalBody = null
				d.professionalMembershipNumber = null
			} else if (
				data.isProfessionalBodyMember == false ||
				data.isProfessionalBodyMember == 'false'
			) {
				d.isProfessionalBodyMember = true
				d.professionalBody = data.professionalBody
				d.professionalMembershipNumber =
					data.professionalMembershipNumber
			}
		}
	}

	return d
}
