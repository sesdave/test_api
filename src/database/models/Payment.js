'use strict';

module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    paymentId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4
    },
    personnelFeeId: {
      type: DataTypes.STRING,
      allowNull: true,
    },    
    firmFeeId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'reverted', 'failed'),
      allowNull: false,
      defaultValue: 'pending'
    },
  },{
    tableName: 'payments',
    underscored: true,
    schema: 'public', // <------------
  });

  Payment.associate = (models) => {
    models.Payment.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
        type: DataTypes.STRING
      },
    });
    models.Payment.belongsTo(models.PersonnelFee, {
      foreignKey: {
        name: "personnelFeeId",
        allowNull: true,
        type: DataTypes.STRING
      },
    });
    models.Payment.belongsTo(models.FirmFee, {
      foreignKey: {
        name: "firmFeeId",
        allowNull: true,
        type: DataTypes.STRING
      },
    });
  };

  return Payment;
};