const models = require('../models')

exports.getByUserId = async (userId) => {
	const records = await models.Document.findAll({
		where: {
			userId,
		},
	})

	return records
}

exports.create = async (data) => {
	const newRecords = await models.Document.bulkCreate(data)
	return newRecords
}

exports.remove = async (ids) => {
	const result = await models.Document.destroy({
		where: {
			documentId: ids,
		},
	})

	return result
}

exports.update = async (data, documentId) => {
	const updated = await models.Document.update(data, {
		where: { documentId },
	})

	return updated
}
