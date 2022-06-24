const stateRepository = require('../database/repositories/state')
const CustomError = require('../utils/customError')

exports.getStates = async () => {
  const states = await stateRepository.getStates()

	return states
}