const tokens = require("../utils/tokens");

module.exports = (userTypeArray) => async (req, res, next) => {
	try {
		const token = req.headers['authorization'].replace('Bearer ', '')
		const user = await tokens.decodeToken(token)
		if (!user) throw new Error()
		userTypeArray.forEach(element => {
			if(user.userType==element){
				req.user = {
					userId: user.userId,
					userType: user.userType,
					profileId: user.profileId,
					userRoles: user.roles,
				}
			}
		});
		if(!req.user)throw new Error()
		

		next()
	} catch (error) {
		return res.status(403).json({
			error: 1,
			msg: 'User not authorized!',
		})
	}
}
