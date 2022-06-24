const { Router } = require('express');
const documentController = require('../../controllers/document.controller');
const router = Router();

// get user documents
router.get('/:userId', documentController.getDocument)

// Add documents
router.post('/', documentController.addDocuments)

// Update document
router.put('/:documentId', documentController.updateDocument)

// remove documents
router.post('/delete', documentController.removeDocuments)

module.exports = router