const personelEducationRepository= require('../database/repositories/personnelEducation');

exports.addEducationRecord=async(data, id)=>{
    const savedRecord= await personelEducationRepository.create(data, id);
    return savedRecord;

}
exports.updateEducationRecord=async(id, data)=>{
    const updatedRecord=await personelEducationRepository.updateByPersonnelEducationId(id, data);
    if (!updatedRecord)
		throw new CustomError('Personnel Record record not found!', 404)

	return true
}

exports.getAllEducationRecords= async(personnelId)=>{
    const allRecords = await personelEducationRepository.getAllPersonnelEducationById(personnelId);
    return allRecords;

}
exports.deleteEducationRecord = async(ids=[])=>{
    const done= await personelEducationRepository.deletePersonnelEducation(ids)
    return done;
}