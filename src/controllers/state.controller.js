const stateService = require('../services/state.service')

exports.getStates = async (req, res, next) => {
	try {
    const result = await stateService.getStates()
    return res.status(200).json({
			error: 0,
			msg: 'State details.',
			data: result,
		})
	} catch (error) {
		next(error)
	}
}
