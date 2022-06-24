const personnelEducationService=require('../services/personnelEducation.service')

exports.addPersonnelEducation= async(req, res, next)=>{
    console.log('request', req);
    try {
        const response = await personnelEducationService.addEducationRecord(req.body, req.user.profileId);
        return res.status(200).json({
            error: 0,
            msg:'Successfully added Educational Record',
            data: response
        })
    }catch (error) {
        next(error)
    }
}

exports.getAllPersonnelEducation= async(req, res, next)=>{
    try {
        const response=await personnelEducationService.getAllEducationRecords(req.user.profileId);
        return res.status(200).json({
            error:0,
            msg: 'Personnel Education details',
            data: response
        })
    } catch (error) {
        next(error)
    }
}

exports.updatePersonnelEducation = async(req, res, next)=>{
    console.log('education id', req.params.educationId); //educationId
    try {
        const response = await personnelEducationService.updateEducationRecord(req.params.educationId, req.body);
        return res.status(200).json({
            error:0,
            msg: `Successfully updated Education detail`,
            data: response
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteEducation = async (req, res, next) => {
	try {
		const response = await personnelEducationService.deleteEducationRecord(
			req.body
		)

		return res.status(200).json({
			error: 0,
			msg: `deleted successfully.`,
			data: response,
		})
	} catch (error) {
		next(error)
	}
}