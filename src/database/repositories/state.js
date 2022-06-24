const models = require('../models')

exports.getStates = async () => {
	const result = await models.State.findAll()
	return result
}
