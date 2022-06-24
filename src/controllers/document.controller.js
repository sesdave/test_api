const documentService = require('../services/document.service')

exports.getDocument = async (req, res, next) => {
	try {
    const response = await documentService.getByUserId(req.params.userId)
    return res.status(201).json({
			error: 0,
			msg: `Documents`,
			data: response,
		})
	} catch (error) {
		next(error)
	}
}

exports.addDocuments = async (req, res, next) => {
	try {
		const response = await documentService.create(req.body)
		return res.status(201).json({
			error: 0,
			msg: `Documents added successfully!`,
			data: response,
		})
	} catch (error) {
		next(error)
	}
}

exports.updateDocument = async (req, res, next) => {
	try {
    const response = await documentService.update(req.body, req.params.documentId)
		return res.status(201).json({
			error: 0,
			msg: `Document updated successfully!`,
			data: response,
		})
	} catch (error) {
    next(error)
	}
}

exports.removeDocuments = async (req, res, next) => {
  try {
    const response = await documentService.remove(req.body)
    return res.status(201).json({
      error: 0,
      msg: `Documents deleted successfully!`,
      data: response,
    })
	} catch (error) {
		next(error)
	}
}
