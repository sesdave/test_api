const aclService = require('../services/acl.service')

exports.createRole = async (req, res, next) => {
	try {
		const response = await aclService.create(req.body, req.user)

		return res.status(201).json({
			error: 0,
			msg: `Role created successfully.`,
			data: response,
		})
	} catch (error) {
		next(error)
	}
}

exports.createPermission = async (req, res, next) => {
	try {
		const response = await aclService.createPermission(req.body, req.user)

		return res.status(201).json({
			error: 0,
			msg: `Permission created successfully.`,
			data: response,
		})
	} catch (error) {
		next(error)
	}
}

exports.updateRole = async (req, res, next) => {
	try {
		const response = await aclService.updateByRoleId(
			req.params.roleId,
			req.body
		)

		return res.status(200).json({
			error: 0,
			msg: `Role updated successfully.`,
			data: response,
		})
	} catch (error) {
		next(error)
	}
}

exports.getOneRole = async (req, res, next) => {
	try {
		const response = await aclService.getByRoleId(
			req.params.roleId,
			req.user
		)
		return res.status(200).json({
			error: 0,
			msg: 'Role details.',
			data: response,
		})
	} catch (error) {
		next(error)
	}
}

exports.getAllRoles = async (req, res, next) => {
	try {
		const response = await aclService.getSelectedRoles(req.query, req.user)

		return res.status(200).json({
			error: 0,
			msg: 'All selected Roles.',
			data: response,
		})
	} catch (error) {
		next(error)
	}
}

exports.getAllPermissions = async (req, res, next) => {
	try {
		const response = await aclService.getSelectedPermissions(
			req.query,
			req.user
		)

		return res.status(200).json({
			error: 0,
			msg: 'All selected Permissions.',
			data: response,
		})
	} catch (error) {
		next(error)
	}
}

exports.addPermissionsToRole = async (req, res, next) => {
	try {
		const response = await aclService.addPermissionsToARole(
			req.params.roleId,
			req.body.permissionIds
		)

		return res.status(200).json({
			error: 0,
			msg: 'Add Permissions request completed.',
			data: response,
		})
	} catch (error) {
		next(error)
	}
}

exports.removePermissionsFromRole = async (req, res, next) => {
	try {
		const response = await aclService.removePermissionsFromARole(
			req.params.roleId,
			req.body.permissionIds
		)

		return res.status(200).json({
			error: 0,
			msg: 'Remove Permissions request completed.',
			data: response,
		})
	} catch (error) {
		next(error)
	}
}

exports.addRolesToAdmin = async (req, res, next) => {
	try {
		const response = await aclService.addRolesToAdmin(
			req.body.adminId,
			req.body.roleIds
		)

		return res.status(200).json({
			error: 0,
			msg: 'Add Roles to Admim request completed.',
			data: response,
		})
	} catch (error) {
		next(error)
	}
}

exports.removeRoleFromAdmin = async (req, res, next) => {
	try {
		const response = await aclService.removeRoleFromAdmin(
			req.params.adminId,
			req.params.roleId
		)

		return res.status(200).json({
			error: 0,
			msg: 'Removed from role from Admin request completed.',
			data: response,
		})
	} catch (error) {
		next(error)
	}
}

exports.assignStateToAdmin = async (req, res, next) => {
	try {
		const response = await aclService.assignStateToAdmin(
			req.body.adminId,
			req.body.stateIds
		)

		return res.status(200).json({
			error: 0,
			msg: 'Added states to admin',
			data: response,
		})
	} catch (error) {
		next(error)
	}
}

exports.removeStateFromAdmin = async (req, res, next) => {
	try {
		const response = await aclService.removeStateFromAdmin(
			req.body.adminId,
			req.body.stateIds
		)

		return res.status(200).json({
			error: 0,
			msg: 'Removed states from admin',
			data: response,
		})
	} catch (error) {
		next(error)
	}
}

exports.getAdminStates = async (req, res, next) => {
	try {
		const response = await aclService.getAdminStates(req.params.adminId)
		return res.status(200).json({
			error: 0,
			msg: 'Admin states.',
			data: response,
		})
	} catch (error) {
		next(error)
	}
}
