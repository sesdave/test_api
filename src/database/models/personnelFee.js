'use strict';

module.exports = (sequelize, DataTypes) => {
  const PersonnelFee = sequelize.define('PersonnelFee', {
    personnelFeeId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4
    },
    adminId: DataTypes.STRING,
    feeItemId: DataTypes.INTEGER,
    year: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
   // personnelCategory: DataTypes.STRING,
    engineeringBase: DataTypes.STRING,
    liveAndWorkInNigeria: DataTypes.BOOLEAN,
    isProfessionalBodyMember: DataTypes.BOOLEAN,
    membershipType: {
      type: DataTypes.ENUM('applicant', 'registered'),
      allowNull: false,
      defaultValue: 'applicant'
    },
    status: {
      type: DataTypes.ENUM('pending', 'published', 'inactive'),
      allowNull: false,
      defaultValue: 'pending'
    },
  },{
     tableName: 'personnelfees',
     underscored: true,
     schema: 'public', // <------------
   });

  PersonnelFee.associate = (models) => {
    // define association here
    models.PersonnelFee.belongsTo(models.PersonnelCategory,{
      foreignKey:{
        name:"personnelCatId",
        allowNull:false,
        type: DataTypes.INTEGER
      }
    })
    models.PersonnelFee.belongsTo(models.Admin, {
      foreignKey: {
        name: 'adminId',
        type: DataTypes.STRING
      }
    });
    models.PersonnelFee.belongsTo(models.FeeItem, {
      foreignKey: {
        name: 'feeItemId',
        type: DataTypes.INTEGER
      }
    });
  };

  return PersonnelFee;
};