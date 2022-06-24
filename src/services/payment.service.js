const paymentRepository = require('../database/repositories/Payment');
const Remita = require('../utils/PaymentProvider/remita');
const feeItemService = require('../services/feeItem.service');
const CustomError = require('../utils/customError');
const { generateId } = require('../utils/helpers');

const initialize = async (data, user) => {
	const isDuplicate = await paymentRepository.checkDuplicate(data.reference);
    if (isDuplicate) throw new CustomError('Payment reference record exists!', 400);

	const response = await paymentRepository.create(data);
	return response;
}

const finalize = async (reference) => {
    const paymentInfo = await Remita.verifyPayment(reference);
    let status;
    if (paymentInfo.status === '021') status = 'pending';
    else if (paymentInfo.status === '02') status = 'failed';
    else if (paymentInfo.status === '00') status = 'completed';
    else if (paymentInfo.status === '023') throw new CustomError(paymentInfo.message, 400);
    else throw new CustomError('An error prevented finalizing payment. Please try again', 400);
	await paymentRepository.updateByPaymentReference(reference, { status });
	const response = await paymentRepository.getByPaymentReference(reference);
	return response;
}

const linkPayment = async (body, user) => {
	const isDuplicate = await paymentRepository.checkDuplicate(body.reference);
    if (isDuplicate) throw new CustomError('Payment reference record exists!', 400);

	await paymentRepository.create(body);
	const response = await paymentRepository.getByPaymentReference(body.reference);
	return response;
}

const getByPaymentReference = async (reference, user) => {
	let filter = { reference };
	if (user.userType !== 'Admin') filter = { reference, userId: user.userId };
	const response = await paymentRepository.getByPaymentReference(filter);
	if (!response) throw new CustomError('Payment info with reference not found', 400);
	return response;
}

const getByPaymentId = async (paymentId, user) => {
	let filter = { paymentId };
	if (user.userType !== 'Admin') filter = { paymentId, userId: user.userId };
	const response = await paymentRepository.getByPaymentId(filter);
	if (!response) throw new CustomError('Payment info with ID not found', 400);
	return response;
}

const getSelectedPayments = async (filter, user) => {
	if (user.userType !== 'Admin') throw new CustomError('You do not have permission to view this', 401);
	const response = await paymentRepository.getSelectedPayments(filter);
	return response;
}

const getUserPayments = async (userId, user) => {
	if (user.userType !== 'Admin'&& userId !== user.userId) throw new CustomError('You do not have permission to view this', 401);
	const response = await paymentRepository.getSelectedPayments({ userId });
	return response;
}

module.exports = {
	initialize,
	finalize,
	linkPayment,
	getSelectedPayments,
	getByPaymentId,
	getByPaymentReference,
	getUserPayments
}
