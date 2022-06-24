'use strict';

module.exports = (sequelize, DataTypes) => {
  const Regulation = sequelize.define('Regulation', {
    regulationId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4
    },
    entityName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    entityType: {
      type: DataTypes.ENUM('firm', 'personnel'),
      allowNull: true,
    },
    entityContact: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    subject: {
      type:DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reporterEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reporterPhone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'active', 'resolved'),
      allowNull: false,
      defaultValue: 'pending'
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });

  Regulation.associate = (models) => {
    models.Regulation.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: true,
        type: DataTypes.STRING
      },
    });
  };

  return Regulation;
};