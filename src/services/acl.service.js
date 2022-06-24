const aclRepository = require('../database/repositories/acl')
const CustomError = require('../utils/customError')

exports.create = async (data, user = {}) => {
	const isDuplicate = await aclRepository.checkDuplicate(data.name)
	if (isDuplicate) throw new CustomError('Role record exists!', 400)

	const createData = { ...data, createdBy: user.userId }
	const savedRecord = await aclRepository.createRole(createData)

	return savedRecord
}

exports.createPermission = async (data, user = {}) => {
	const isDuplicate = await aclRepository.checkPermissionDuplicate(data.name)
	if (isDuplicate) throw new CustomError('Permission record exists!', 400)

	const createData = { ...data, createdBy: user.userId }
	const savedRecord = await aclRepository.createPermission(createData)

	return savedRecord
}

exports.updateByRoleId = async (roleId, data, user) => {
	const response = await aclRepository.updateByRoleId(roleId, data)
	if (!response) throw new CustomError('Role record not found!', 404)

	return true
}

exports.getByRoleId = async (roleId, user) => {
	const savedRecord = await aclRepository.getByRoleId(roleId)
	if (!savedRecord) throw new CustomError('Role record not found!', 404)

	return savedRecord
}

exports.getSelectedRoles = async (filter, user) => {
	const result = await aclRepository.getSelectedRoles(filter)

	return result
}

exports.getSelectedPermissions = async (filter, user) => {
	const result = await aclRepository.getSelectedPermissions(filter)

	return result
}

exports.addPermissionsToARole = async (roleId, permissions = []) => {
	const result = await aclRepository.addPermissionsToARole(
		roleId,
		permissions
	)
	if (!result) throw new CustomError('Role record not found!', 404)

	const isAllSuccess = result.every((r) => r.error == 0)
	if (!isAllSuccess) {
		return {
			failed: result.filter((r) => r.error == 1).map((r) => r.msg),
			passed: result.filter((r) => r.error == 0).map((r) => r.msg),
		}
	}

	return { failed: [], passed: result.map((r) => r.msg) }
}

exports.removePermissionsFromARole = async (roleId, permissions = []) => {
	const result = await aclRepository.removePermissionsFromARole(
		roleId,
		permissions
	)
	if (!result) throw new CustomError('Role record not found!', 404)

	const isAllSuccess = result.every((r) => r.error == 0)
	if (!isAllSuccess) {
		return {
			failed: result.filter((r) => r.error == 1).map((r) => r.msg),
			passed: result.filter((r) => r.error == 0).map((r) => r.msg),
		}
	}

	return { failed: [], passed: result.map((r) => r.msg) }
}

exports.addRolesToAdmin = async (adminId, roleIds = []) => {
	const result = await aclRepository.addRolesToAdmin(adminId, roleIds)
	if (!result) throw new CustomError('Could not process request.')
	return result
}

exports.removeRoleFromAdmin = async (adminId, roleId) => {
	const result = await aclRepository.removeRoleFromAdmin(adminId, roleId)
	if (!result) throw new CustomError('Could not process request.')
	return result
}

exports.assignStateToAdmin = async (adminId, stateIds) => {
	const result = await aclRepository.assignStateToAdmin(adminId, stateIds)
	if (!result) throw new CustomError('Could not process request.')
	return result
}

exports.removeStateFromAdmin = async (adminId, stateIds) => {
	const result = await aclRepository.removeStateFromAdmin(adminId, stateIds)
	if (!result) throw new CustomError('Could not process request.')
	return result
}

exports.getAdminStates = async (adminId, user) => {
	const results = await aclRepository.getAdminStates(adminId)

	return results
}
