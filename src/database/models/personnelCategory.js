'use strict';

module.exports=function(sequelize, DataTypes){
    const PersonnelCategory=sequelize.define('PersonnelCategory', {
        categoryId:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement: true,
            primaryKey:true,
           // defaultValue: DataTypes.UUIDV4
        },
        name:{
            type: DataTypes.STRING,
            allowNull:false
        },
        description:{
            type: DataTypes.STRING,
        }
    });

    PersonnelCategory.associate=(models)=>{
        models.PersonnelCategory.hasMany(models.PersonnelFee, {
            foreignKey:{
                name:'personnelCatId',
                allowNull:false
            }
        })

        models.PersonnelCategory.hasMany(models.Personnel, {
            foreignKey:{
                name:'personnelCatId',
                allowNull:false
            }
        })
    };

    return PersonnelCategory;
}