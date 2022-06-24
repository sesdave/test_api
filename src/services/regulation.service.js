const regulationRepository = require('../database/repositories/regulation');
const CustomError = require('../utils/customError');

exports.create = async (data, user = {}) => {
    const savedRecord = await regulationRepository.create(data);

    return savedRecord;
}

exports.updateByRegulationId = async (regulationId, data, user) => {
    const response = await regulationRepository.updateByRegulationId(regulationId, data);
    if (!response) throw new CustomError('Regulation record not found!', 404);

    return true;
}

exports.getByRegulationId = async (regulationId, user) => {
    const savedRecord = await regulationRepository.getByRegulationId(regulationId);
    if (!savedRecord) throw new CustomError('Regulation record not found!', 404);

    return savedRecord;
}

exports.getSelectedRegulations = async (filter, user) => {
    const result = await regulationRepository.getSelectedRegulations(filter);

    return result;
}