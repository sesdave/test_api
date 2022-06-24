const firmService = require('../services/firm.service')
const { firmStatus } = require('../database/repositories/firm')

exports.updateFirm = async (req, res, next) => {
	try {
		const response = await firmService.updateByFirmId(
			req.params.firmId,
			req.body
		)

		return res.status(200).json({
			error: 0,
			msg: `Firm updated successfully.`,
			data: response,
		})
	} catch (error) {
		next(error)
	}
}

exports.getByAdminStates = async (req, res, next) => {
	try {
		const response = await firmService.getByAdminStates(req.params.adminId)
		return res.status(200).json({
			error: 0,
			msg: `Firm details.`,
			data: response,
		})
	} catch (error) {
		next(error)
	}
}

exports.approveToVetted = async (req, res, next) => {
	try {
		const response = await firmService.updateByFirmId(
			req.params.firmId,
			{
				applicationStatus: firmStatus.Vetted,
			},
			req.user
		)

		return res.status(200).json({
			error: 0,
			msg: `Personnel approved to vetted successfully.`,
			data: response,
		})
	} catch (error) {
		next(error)
	}
}
