const personelWorkExperienceRepository= require('../database/repositories/personnelWorkExperience');

exports.addWorkExperience=async(data, id)=>{
    const savedRecord= await personelWorkExperienceRepository.create(data, id);
    return savedRecord;

}
exports.updateWorkExperience=async(id, data)=>{
    const updatedRecord=await personelWorkExperienceRepository.updateByPersonnelExpatriateId(id, data);
    if (!updatedRecord)
		throw new CustomError('Personnel Experience record not found!', 404)

	return true
}

exports.getAllWorkExperience= async(personnelId)=>{
    const allRecords = await personelWorkExperienceRepository.getWorkExperienceByPersonnelId(personnelId);
    return allRecords;

}
exports.deleteWorkExperience = async(ids=[])=>{
    const done= await personelWorkExperienceRepository.deletePersonnelWorkExperience(ids)
    return done;
}