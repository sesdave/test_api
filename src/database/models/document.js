'use strict'

module.exports = function (sequelize, DataTypes) {
	const Document = sequelize.define('Document', {
		documentId: {
			type: DataTypes.STRING,
			primaryKey: true,
			allowNull: false,
			defaultValue: DataTypes.UUIDV4,
		},
		name: {
			type: DataTypes.STRING,
		},
		URL: {
			type: DataTypes.STRING,
		},
	})

	Document.associate = (models) => {
		models.Document.belongsTo(models.User, {
			foreignKey: {
				name: 'userId',
				allowNull: false,
				types: DataTypes.STRING,
			},
		})
	}

	return Document
}
