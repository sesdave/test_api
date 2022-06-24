'use strict';

module.exports = (sequelize, DataTypes) => {
  const FeeItem = sequelize.define('FeeItem', {
    feeItemId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
     // defaultValue:1
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    description: DataTypes.STRING,
    adminId: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM('pending', 'published', 'inactive'),
      allowNull: false,
      defaultValue: 'published'
    },
  });

  FeeItem.associate = (models) => {
    // define association here
    models.FeeItem.belongsTo(models.Admin, {
      foreignKey: {
        name: 'adminId',
        type: DataTypes.INTEGER
      }
    });
    models.FeeItem.hasMany(models.PersonnelFee, {
      foreignKey: {
        name: 'feeItemId',
        type: DataTypes.INTEGER
      }
    });
    models.FeeItem.hasMany(models.FirmFee, {
      foreignKey: {
        name: 'feeItemId',
        type: DataTypes.INTEGER
      }
    });
  };

  return FeeItem;
};