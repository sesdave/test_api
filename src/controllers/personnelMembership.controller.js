const personnelMembershipService = require('../services/personnelMembership.service')

exports.addMemberships = async (req, res, next) => {
	try {
		const response = await personnelMembershipService.addMemeberships(
			req.body
		)

		return res.status(201).json({
			error: 0,
			msg: `Personnel Memebership created successfully.`,
			data: response,
		})
	} catch (error) {
		next(error)
	}
}

exports.deleteMemberships = async (req, res, next) => {
	try {
		const response = await personnelMembershipService.deleteMemberships(
			req.body
		)

		return res.status(200).json({
			error: 0,
			msg: `Personnel Memebership deleted successfully.`,
			data: response,
		})
	} catch (error) {
		next(error)
	}
}

exports.updateMembership = async (req, res, next) => {
	try {
		const response = await personnelMembershipService.updateMembership(
			req.params.membershipId,
			req.body
		)

		return res.status(200).json({
			error: 0,
			msg: `Personnel Memebership updated successfully.`,
			data: response,
		})
	} catch (error) {
		next(error)
	}
}

exports.getMemberships = async (req, res, next) => {
	try {
		const response = await personnelMembershipService.getMemberships(
			req.params.personnelId
		)

		return res.status(200).json({
			error: 0,
			msg: 'Personnel Membership details.',
			data: response,
		})
	} catch (error) {
		next(error)
	}
}

exports.getMembershipByPersonnel= async(req, res, next)=>{
	console.log('user', req.user)
	try {
		const response= await personnelMemebershipService.getMembershipsByPersonnel(req.user.profileId);
		res.status(200).json({
			error:0,
			msg: 'Personnel Membership details.',
			data: response,

		})
	} catch (error) {
		
	}

}
