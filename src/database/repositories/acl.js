const models = require('../models')
const { Op } = require('sequelize')

exports.checkDuplicate = async (name) => {
	const check = await models.Role.findOne({
		where: {
			name: { [models.Sequelize.Op.iLike]: name },
		},
	})

	return !!check
}

exports.checkPermissionDuplicate = async (name) => {
	const check = await models.Permission.findOne({
		where: {
			name: { [models.Sequelize.Op.iLike]: name },
		},
	})

	return !!check
}

exports.createRole = async (data) => {
	const cleanedData = toDataBase(data)
	const newRecord = await models.Role.create({
		...cleanedData,
		createdBy: data.createdBy,
	})

	return toDomain(newRecord)
}

exports.createPermission = async (data) => {
	const newRecord = await models.Permission.create(data)

	return permissionToDomain(newRecord)
}

exports.updateByRoleId = async (roleId, data) => {
	const cleanedData = toDataBase(data)
	const response = await models.Role.update(cleanedData, {
		where: { roleId },
	})

	return response
}

exports.getByRoleId = async (roleId) => {
	const savedRecord = await models.Role.findOne({
		where: { roleId },
		include: [
			{
				model: models.Permission,
			},
		],
	})
	// savedRecord.permissions = await savedRecord.getPermissions();
	return savedRecord ? toDomain(savedRecord) : null
}

exports.addPermissionsToARole = async (roleId, permissions = []) => {
	const savedRole = await models.Role.findByPk(roleId)
	if (!savedRole) return null

	const result = await Promise.all(
		permissions.map(
			async (p) =>
				new Promise(async (resolve, reject) => {
					const savedPermission = await models.Permission.findByPk(p)
					if (!savedPermission)
						return resolve({
							error: 1,
							msg: `result for ${p}: Permission not found.`,
						})

					const response = await savedRole.addPermission(
						savedPermission
					)
					if (!response)
						return resolve({
							error: 1,
							msg: `result for ${p}: Permission association exists.`,
						})

					return resolve({
						error: 0,
						msg: `result for ${p}: Permission added successfully.`,
					})
				})
		)
	)
	return result
}

exports.removePermissionsFromARole = async (roleId, permissions = []) => {
	const savedRole = await models.Role.findByPk(roleId)
	if (!savedRole) return null

	const result = await Promise.all(
		permissions.map(
			async (p) =>
				new Promise(async (resolve, reject) => {
					const savedPermission = await models.Permission.findByPk(p)
					if (!savedPermission)
						return resolve({
							error: 1,
							msg: `result for ${p}: Permission not found.`,
						})

					const response = await savedRole.removePermission(
						savedPermission
					)
					if (!response)
						return resolve({
							error: 1,
							msg: `result for ${p}: Permission association does not exist.`,
						})

					return resolve({
						error: 0,
						msg: `result for ${p}: Permission removed successfully.`,
					})
				})
		)
	)

	return result
}

exports.getSelectedRoles = async (filter = {}) => {
	const query = getRoleQueryParams(filter)
	const allRecords = await models.Role.findAll(query)

	return allRecords.map(toDomain)
}

exports.getSelectedPermissions = async (filter = {}) => {
	const query = getPermissionQueryParams(filter)
	const allRecords = await models.Permission.findAll(query)

	return allRecords.map(permissionToDomain)
}

exports.addRolesToAdmin = async (adminId, roleIds = []) => {
	const [roles, admin] = await Promise.all([
		new Promise(async (resolve, _) => {
			const roles = await models.Role.findAll({
				where: {
					roleId: {
						[Op.in]: roleIds,
					},
				},
			})
			resolve(roles)
		}),
		new Promise(async (resolve, _) => {
			const admin = await models.Admin.findOne({
				where: { adminId },
				include: [{ model: models.Role }],
			})
			resolve(admin)
		}),
	])

	if (!admin) {
		return {
			error: 1,
			msg: `Admin with id ${adminId} was not found`,
		}
	}

	const newRoles = roles.filter((r) => {
		const roles = admin.Roles.map((r) => r.roleId)
		return !roles.includes(r.roleId)
	})
	await admin.addRoles(newRoles, { through: 'RolesAdmins' })

	return {
		err: 0,
		msg: `Added roles to admin`,
	}
}

exports.assignStateToAdmin = async (adminId, stateIds) => {
	const [states, admin] = await Promise.all([
		new Promise(async (resolve, _) => {
			const states = await models.State.findAll({
				where: {
					stateId: {
						[Op.in]: stateIds,
					},
				},
			})
			resolve(states)
		}),
		new Promise(async (resolve, _) => {
			const admin = await models.Admin.findOne({
				where: { adminId },
				include: [{ model: models.State }],
			})
			resolve(admin)
		}),
	])

	if (!admin) {
		return {
			error: 1,
			msg: `Admin with id ${adminId} was not found`,
		}
	}

	const newStates = states.filter((s) => {
		const states = admin.States.map((s) => s.stateId)
		return !states.includes(s.stateId)
	})
	await admin.addStates(newStates, { through: 'StatesAdmins' })

	return {
		err: 0,
		msg: `Added states to admin`,
	}
}

exports.removeRoleFromAdmin = async (adminId, roleId) => {
	const [role, admin] = await Promise.all([
		new Promise(async (resolve, _) => {
			const role = await models.Role.findOne({
				where: { roleId },
			})
			resolve(role)
		}),
		new Promise(async (resolve, _) => {
			const admin = await models.Admin.findOne({
				where: { adminId },
				include: [{ model: models.Role }],
			})

			resolve(admin)
		}),
	])

	if (!admin) {
		return {
			err: 1,
			msg: `Admin with id ${adminId} was not found`,
		}
	}

	if (!role) {
		return {
			err: 1,
			msg: `Role width id ${roleId} was not found.`,
		}
	}

	await admin.removeRole(role, { through: 'RolesAdmins' })

	return {
		err: 0,
		msg: `Removed roles to admin`,
	}
}

exports.removeStateFromAdmin = async (adminId, stateIds) => {
	const [states, admin] = await Promise.all([
		new Promise(async (resolve, _) => {
			const role = await models.State.findAll({
				where: {
					stateId: {
						[Op.in]: stateIds,
					},
				},
			})
			resolve(role)
		}),
		new Promise(async (resolve, _) => {
			const admin = await models.Admin.findOne({
				where: { adminId },
				include: [{ model: models.State }],
			})

			resolve(admin)
		}),
	])

	if (!admin) {
		return {
			err: 1,
			msg: `Admin with id ${adminId} was not found`,
		}
	}

	const adminStates = states.filter((s) => {
		const states = admin.States.map((s) => s.stateId)
		return states.includes(s.stateId)
	})
	await admin.removeStates(adminStates, { through: 'StatesAdmins' })

	return {
		err: 0,
		msg: `Removed states to admin`,
	}
}

exports.getAdminStates = async (adminId) => {
	const admin = await models.Admin.findOne({ where: { adminId } })
	if (!admin) {
		return {
			err: 1,
			msg: `Admin with id ${adminId} was not found`,
		}
	}

	const states = await admin.getStates()
	return states
}

const toDataBase = (data) => {
	return {
		name: data.name,
		status: data.status,
	}
}

const toDomain = (data) => {
	const d = {
		roleId: data.roleId,
		name: data.name,
		createdBy: data.createdBy,
		status: data.status,
		permissions: data.Permissions,
	}

	return d
}

const permissionToDomain = (data) => {
	const d = {
		permissionId: data.permissionId,
		name: data.name,
	}

	return d
}

const getRoleQueryParams = (filter) => {
	let query = {
		where: {},
		include: [],
	}

	// query.where.status = filter.hasOwnProperty('status') ? filter.status : true;
	// if (filter.status == 'all') delete query.where.status;
	return query
}

const getPermissionQueryParams = (filter) => {
	let query = {
		where: {},
		include: [],
	}

	// query.where.status = filter.hasOwnProperty('status') ? filter.status : true;
	// if (filter.status == 'all') delete query.where.status;
	return query
}
