const personnelService = require('../services/personnel.service')
const { personnelStatus } = require('../database/repositories/personnel')

exports.getByAdminStates = async (req, res, next) => {
	try {
		const response = await personnelService.getByAdminStates(
			req.params.adminId
		)
		return res.status(200).json({
			error: 0,
			msg: `Personnel details.`,
			data: response,
		})
	} catch (error) {
		next(error)
	}
}

exports.updatePersonnel = async (req, res, next) => {
	try {
		const response = await personnelService.updateByPersonnelId(
			req.params.personnelId,
			req.body
		)

		return res.status(200).json({
			error: 0,
			msg: `Personnel updated successfully.`,
			data: response,
		})
	} catch (error) {
		next(error)
	}
}

exports.getSelectedPersonnel = async(req, res, next)=>{
    try{
        const response = await personnelService.getSelectedPersonnels(req.query);
		return res.status(200).json({
			error:0,
			msg: 'Selected Personnel',
			data: response
		})
    }catch(error){
        next(error)
    }
}

exports.approveToVetted = async (req, res, next) => {
	try {
		const response = await personnelService.updateByPersonnelId(
			req.params.personnelId,
			{
				applicationStatus: personnelStatus.Vetted,
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

exports.approveToActivateAfterPayment=async(req, res, next)=>{
	try{
		const response=personnelService.approveToActivateAfterPayment(req);
		res.status(200).json({
		status:'success'
	})
	}catch(error){
		next(error)
	}
	
}
