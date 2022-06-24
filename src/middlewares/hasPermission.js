const models = require('../database/models')

module.exports = (permission) => {
	return async (req, res, next) => {
		if (req.user.userType !== 'Admin') {
			return res.status(403).json({
				error: 1,
				msg: 'Access denied.',
			})
		}

		const admin = await models.Admin.findOne({
			where: { adminId: req.user.profileId },
			include: [
				{
					model: models.Role,
					include: [
						{
							model: models.Permission,
						},
					],
				},
			],
		})

		if (!admin) {
			return res.status(403).json({
				error: 1,
				msg: 'Access denied.',
			})
		}
		//console.log('roles are', admin.map((r)=>r.Role));

		const permissions = admin.Roles.reduce(
			(acc, cur) => [...acc, ...cur.Permissions.map((p) => p.name)],
			[]
		)
		console.log('permissions', permissions);

		if (!permissions.includes(permission)) {
			return res.status(403).json({
				error: 1,
				msg: 'Access denied.',
			})
		}

		next()
	}
}
