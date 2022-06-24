const documentRepository = require('../database/repositories/document')
const CustomError = require('../utils/customError')

exports.getByUserId = async (userId) => {
	const result = await documentRepository.getByUserId(userId)
  return result
}

exports.create = async (data) => {
	const createData = data.map((d) => ({ URL: d.URL, userId: d.userId }))
	const saved = await documentRepository.create(createData)
	return saved
}

exports.update = async (data, documentId) => {
	const response = await documentRepository.update(data, documentId)
	if (!response) throw new CustomError('Could not process request', 400)
	return true
}

exports.remove = async (data) => {
	const ids = data.map((d) => d.documentId)
	const response = await documentRepository.remove(ids)
	if (!response) throw new CustomError('Could not process request', 400)
	return true
}
