const paymentService = require('../services/payment.service');
const personnelFeeService = require('../services/personnelFee.service');
const firmFeeService = require('../services/firmFee.service');
const feeItemService = require('../services/feeItem.service');
const userRepository = require('../database/repositories/user');
const Remita = require('../utils/PaymentProvider/remita');
const { generateId } = require('../utils/helpers');
const CustomError = require('../utils/customError');

exports.initialize = async (req, res, next) => {
    try {
        if (!req.body.firmFeeId && !req.body.personnelFeeId)
            return next(new CustomError('The applicable fee information is missing. One of "personnelFeeId" and "firmFeeId" is required', 400));
        else if (req.body.firmFeeId && req.body.personnelFeeId)
            return next(new CustomError('Only one of "personnelFeeId" and "firmFeeId" is required, you cannot add both to request body', 400));
        
        req.body.orderId = generateId();
        let feeData;
        feeData = req.body.personnelFeeId ? await personnelFeeService.getByPersonnelFeeId(req.body.personnelFeeId, req.user) : await firmFeeService.getByFirmFeeId(req.body.firmFeeId, req.user) ;
        const feeItemData = await feeItemService.getByFeeItemId(feeData.feeItemId, req.user);
        const userData = await userRepository.findByUserId(req.body.userId);
        console.log(userData)
        const paymentData = await Remita.initializePayment({
            payerName: userData.name ? userData.name : userData.firmName ? userData.firmName : `${userData.firstName} ${userData.lastName}`,
            payerEmail: userData.email,
            payerPhone: userData.phone ? userData.phone : null,
            orderId: req.body.orderId,
            amount: feeData.amount,
            description: feeItemData.description,
            customFields: [
                {
                    name: 'userId',
                    value: req.body.userId,
                    type: 'ALL',
                }
            ]
        });
        req.body.amount = feeData.amount;
        req.body.reference = paymentData.RRR;
        req.body.description = feeItemData.description;

        const response = await paymentService.initialize(req.body, req.user);
        return res.status(201).json({
            error: 0,
            msg: `Payment initialized successfully.`,
            data: response
        });
    }
    catch(error) {
        next(error);
    }
}

exports.finalize = async (req, res, next) => {
    try {
        const response = await paymentService.finalize(req.params.reference.toString());
        
        return res.status(200).json({
            error: 0,
            msg: `Payment status updated successfully.`,
            data: response
        })
    } catch (error) {
        next(error);
    }
}

exports.getOneByReference = async (req, res, next) => {
    try {
        const response = await paymentService.getByPaymentReference(req.params.reference, req.user);

        return res.status(200).json({
            error: 0,
            msg: 'Payment information fetched successfully.',
            data: response
        })
    } catch (error) {
        next(error);
    }
}

exports.getOneById = async (req, res, next) => {
    try {
        const response = await paymentService.getByPaymentId(req.params.paymentId, req.user);

        return res.status(200).json({
            error: 0,
            msg: 'Payment information fetched successfully.',
            data: response
        })
    } catch (error) {
        next(error);
    }
}

exports.getAll = async (req, res, next) => {
    try {
        const response = await paymentService.getSelectedPayments(req.query, req.user);

        return res.status(200).json({
            error: 0,
            msg: 'All selected payments.',
            data: response
        })
    } catch (error) {
        next(error);
    }
}

exports.linkPayment = async (req, res, next) => {
    try {
        if (!req.body.firmFeeId && !req.body.personnelFeeId)
            return next(new CustomError('The applicable fee information is missing. One of "personnelFeeId" and "firmFeeId" is required', 400));
        else if (req.body.firmFeeId && req.body.personnelFeeId)
            return next(new CustomError('Only one of "personnelFeeId" and "firmFeeId" is required, you cannot add both to request body', 400));
        
        req.body.orderId = generateId();
        let feeData;
        feeData = req.body.personnelFeeId ? await personnelFeeService.getByPersonnelFeeId(req.body.personnelFeeId, req.user) : await firmFeeService.updateByFirmFeeId(req.body.firmFeeId, req.user) ;
        const feeItemData = await feeItemService.getByFeeItemId(feeData.feeItemId, req.user);
        const paymentInfo = await Remita.verifyPayment(req.body.reference);
        let status;
        if (paymentInfo.status === '021') status = 'pending';
        else if (paymentInfo.status === '02') status = 'failed';
        else if (paymentInfo.status === '00') status = 'completed';
        else if (paymentInfo.status === '023') return next(new CustomError(paymentInfo.message, 400));
        else return next(new CustomError('An error prevented finalizing payment. Please try again', 400));

        if (feeData.amount !== paymentInfo.amount.toString()) {
            return next(new CustomError('Amount paid with Remita does not match the amount of the selected fee', 400));
        }
        const body = {
            [req.body.personnelFeeId ? 'personnelFeeId' : 'firmFeeId']: req.body.personnelFeeId ? req.body.personnelFeeId : req.body.firmFeeId,
            amount: feeData.amount,
            reference: req.body.reference,
            orderId: generateId(),
            userId: req.body.userId,
            description: feeItemData.description,
            status
        };
        const response = await paymentService.linkPayment(body, req.user);

        return res.status(200).json({
            error: 0,
            msg: 'Payment linked successfully.',
            data: response
        })
    } catch (error) {
        next(error);
    }
}

exports.verifyPayment = async (req, res, next) => {
    try {
        const response = await paymentService.getSelectedPayment(req.query, req.user);

        return res.status(200).json({
            error: 0,
            msg: 'Payment data fetched successfully.',
            data: response
        })
    } catch (error) {
        next(error);
    }
}