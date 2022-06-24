'use strict'

module.exports = function (sequelize, DataTypes) {
	const State = sequelize.define('State', {
		stateId: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
			defaultValue: DataTypes.UUIDV4,
		},
		name: {
			type: DataTypes.STRING,
		},
	})

	State.associate = (models) => {
		models.State.belongsToMany(models.Admin, {
			through: 'StatesAdmins',
		})
	}

	return State
}
