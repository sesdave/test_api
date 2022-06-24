const firmRepository = require('../database/repositories/firm')
const CustomError = require('../utils/customError')

exports.create = async (data, user = {}) => {
	const createData = prepareFirmData(data)
  const savedRecord = await firmRepository.create(createData)
  return savedRecord
}

exports.updateByFirmId = async (firmId, data, user) => {
  const updateData = prepareFirmData(data)
  const result = await firmRepository.updateByFirmId(firmId, updateData)
  if (!result) throw new CustomError('Firm record not found!', 404);

  // if (data.applicationStatus) await logTreatmentData({ ...data, personnelId }, user);
  return true
}

exports.getByFirmId = async (firmId, user) => {
  const savedRecord = await firmRepository.getByFirmId(firmId);
  if (!savedRecord) throw new CustomError('Firm record not found!', 404);

  return savedRecord;
}

exports.getByAdminStates = async (adminId, user) => {
	const results = await firmRepository.getByAdminStates(adminId)
	return results
}

exports.getSelectedFirms = async (filter, user) => {
  const query = getQueryParams(filter);
  const result = await firmRepository.getSelectedFirms(query);

  return result;
}

const getQueryParams = filter => {
  return filter;
}

const logTreatmentData = async (data, user) => {
  const treatmentLogRepository = require('../database/repositories/treatmentLog');
  const isAdminRequest = user.permission && user.permission != '';
  let adminId = null,
      applicantType = 'Firm',
      submittedAt = Date.now(),
      treatedAt = null,
      reason = '* Submitted By Applicant *';

  if (isAdminRequest) {
      const lastApplicantLog = await treatmentLogRepository.getLastSubmittedLog(data.firmId, applicantType);

      adminId = user.profileId;
      submittedAt = lastApplicantLog.submittedAt;
      treatedAt = Date.now();
      reason = data.reason || null;
  }

  const logPayload = {
      applicationStatus: data.applicationStatus,
      firmId: data.firmId,
      applicantType,
      reason,
      submittedAt,
      treatedAt,
      adminId
  }
  await treatmentLogRepository.create(logPayload);
}


const prepareFirmData = (data) => {
	const d = {
		userId: data.userId,
		imageUrl: data.imageUrl,
		firstName: data.firstName,
		lastName: data.lastName,
		otherNames: data.otherNames,
		email: data.email,
		phone: data.phone,
    firmName: data.firmName,
    firmType: data.firmType,
    yearEstablished: data.yearEstablished,
    rcNumber: data.rcNumber,
    rcRegType: data.rcRegType,
    rcRegYear: data.rcRegYear,
		practiceState: data.practiceState,
		firmCategory: data.firmCategory,
		firmSize: data.firmSize,
		consultingRegType: data.consultingRegType,
		formerName: data.formerName,
		formerYearEstablished: data.formerYearEstablished,
		yearOfIncor: data.yearOfIncor,
		about: data.about,
		applicationStatus: data.applicationStatus,
    stateId: data.stateId
	}
	return d
}
