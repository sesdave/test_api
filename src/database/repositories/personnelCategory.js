const models= require('../models');

exports.create=async data=>{
    const cleanedData= toDataBase(data);
    const newRecord=await models.PersonnelCategory.create(cleanedData);
    return toDomain(newRecord);

}

const toDataBase=data=>{
    return{
        name:data.name
    }
}

const toDomain=data=>{
    const d={
        name:data.name
    }
    return d;
}