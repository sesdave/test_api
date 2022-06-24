const regulationService = require('../services/regulation.service');

exports.create = async (req, res, next) => {
    try {
        const response = await regulationService.create(req.body, req.user);

        return res.status(201).json({
            error: 0,
            msg: `Report created successfully.`,
            data: response
        })
    } catch (error) {
        next(error);
    }
}

exports.update = async (req, res, next) => {
    try {
        const response = await regulationService.updateByRegulationId(req.params.regulationId, req.body);
        
        return res.status(200).json({
            error: 0,
            msg: `Report updated successfully.`,
            data: response
        })
    } catch (error) {
        next(error);
    }
}

exports.getOne = async (req, res, next) => {
    try {
        const response = await regulationService.getByRegulationId(req.params.regulationId, req.user);

        return res.status(200).json({
            error: 0,
            msg: 'Report details fetched successfully.',
            data: response
        })
    } catch (error) {
        next(error);
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const response = await regulationService.getSelectedRegulations(req.query, req.user);

        return res.status(200).json({
            error: 0,
            msg: 'All selected reports fetched successfully',
            data: response
        })
    } catch (error) {
        next(error);
    }
}