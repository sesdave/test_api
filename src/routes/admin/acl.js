const { Router } = require('express')
const aclController = require('../../controllers/acl.controller')
const hasPermission = require('../../middlewares/hasPermission')
const isAuthorized = require('../../middlewares/isAuthorized')
const validate = require('../../middlewares/Validator/acl')
const constants= require('../../config/constants')

const router = Router()

router.get(
	'/roles/:roleId',
	validate('checkRoleId'),
	isAuthorized([constants.userTypes.Admin]),
	aclController.getOneRole
)

router.put(
	'/roles/:roleId',
	validate('checkRoleId'),
	validate('update'),
	isAuthorized([constants.userTypes.Admin]),
	aclController.updateRole
)

router.post(
	'/roles',
	validate('create'),
	isAuthorized([constants.userTypes.Admin]),
	aclController.createRole
)

router.post(
	'/permissions',
	validate('create'),
	isAuthorized([constants.userTypes.Admin]),
	aclController.createPermission
)

router.get(
	'/roles',
	isAuthorized([constants.userTypes.Admin]),
	//hasPermission('EDIT_PERSONEL_DETAILS'),
	aclController.getAllRoles
)

router.get('/permissions', isAuthorized([constants.userTypes.Admin, constants.userTypes.Personnel]), aclController.getAllPermissions)

router.post(
	'/roles/:roleId/permissions',
	validate('checkRoleId'),
	validate('checkPermissionIds'),
	isAuthorized([constants.userTypes.Admin]),
	aclController.addPermissionsToRole
)

router.delete(
	'/roles/:roleId/permissions',
	validate('checkRoleId'),
	validate('checkPermissionIds'),
	isAuthorized([constants.userTypes.Admin]),
	aclController.removePermissionsFromRole
)

router.post(
	'/roles/admin',
	validate('checkAdminId'),
	validate('checkRoleIds'),
	isAuthorized([constants.userTypes.Admin]),
	aclController.addRolesToAdmin
)

router.delete(
	'/roles/:roleId/admin/:adminId',
	validate('checkAdminId'),
	validate('checkRoleId'),
	isAuthorized([constants.userTypes.Admin]),
	aclController.removeRoleFromAdmin
)

module.exports = router
