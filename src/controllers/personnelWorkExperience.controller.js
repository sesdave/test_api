const personnelWorkExperienceService=require('../services/personnelWorkExperience.service')

exports.addPersonnelWorkExperience= async(req, res, next)=>{
    console.log('request', req);
    try {
        const response = await personnelWorkExperienceService.addWorkExperience(req.body, req.user.profileId);
        return res.status(200).json({
            error: 0,
            msg:'Successfully add Work Experience',
            data: response
        })
    }catch (error) {
        next(error)
    }
}

exports.getAllPersonnelWorkExperience= async(req, res, next)=>{
    try {
        const response=await personnelWorkExperienceService.getAllWorkExperience(req.user.profileId);
        return res.status(200).json({
            error:0,
            msg: 'Personnel Work Experience details',
            data: response
        })
    } catch (error) {
        next(error)
    }
}

exports.updatePersonnelWorkExperience = async(req, res, next)=>{
    try {
        const response = await personnelWorkExperienceService.updateWorkExperience(req.param.workExperienceId, req.body);
        return res.status(200).json({
            error:0,
            msg: `Successfully updated Work Experience`,
            data: response
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteWorkExperience = async (req, res, next) => {
	try {
		const response = await personnelWorkExperienceService.deleteWorkExperience(
			req.body
		)

		return res.status(200).json({
			error: 0,
			msg: `Work Experience deleted successfully.`,
			data: response,
		})
	} catch (error) {
		next(error)
	}
}