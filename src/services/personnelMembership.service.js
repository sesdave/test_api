const personnelMembershipRepository = require('../database/repositories/personnelMembership')
const CustomError = require('../utils/customError')

exports.addMemeberships = async (data) => {
	const savedRecord = await personnelMembershipRepository.create(data)
	return savedRecord
}

exports.deleteMemberships = async (ids = []) => {
	const done = await personnelMembershipRepository.deleteMemberships(ids)
	return done
}

exports.updateMembership = async (id, data) => {
	const response =
		await personnelMembershipRepository.updateByPersonnelMembershipId(
			id,
			data
		)
	if (!response)
		throw new CustomError('Personnel membersip record not found!', 404)

	return true
}

exports.getMemberships = async (personnelId) => {
	const result = await personnelMembershipRepository.getByPersonnelId(
		personnelId
	)
	return result
}

exports.getMembershipsByPersonnel=async(personnelId)=>{
	const result= await personnelMembershipRepository.getMembershipByPersonnel(personnelId);
	return result;
}
