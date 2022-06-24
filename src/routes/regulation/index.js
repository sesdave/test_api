const { Router } = require("express");
const regulationController = require('../../controllers/regulation.controller');
const validate = require('../../middlewares/Validator/regulation');
const isAuthenticated= require('../../middlewares/isAuthenticated');
const isAuthorized= require('../../middlewares/isAuthorized');

const router = Router();

router.get('/', isAuthenticated, isAuthorized(''), regulationController.getAll);
router.post('/', validate('create'), regulationController.create);
router.patch('/:regulationId', isAuthenticated, isAuthorized(''), regulationController.update);
router.get('/:regulationId', isAuthenticated, isAuthorized(''), regulationController.getOne);

module.exports = router;