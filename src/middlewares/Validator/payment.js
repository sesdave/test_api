const { check, oneOf } = require('express-validator')
const validate = require('./baseValidator')

const validationRules = {
  paymentID: [
    check('paymentId')
      .trim()
      .notEmpty()
      .withMessage('"paymentId" is required.')
      .isUUID('4')
      .withMessage('"paymentId" must be a UUIDv4'),
  ],
  initialize: [
    check('personnelFeeId')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('"personnelFeeId" cannot be empty.')
      .isUUID('4')
      .withMessage(
        '"personnelFeeId" must be a UUIDv4'
      ),
    check('firmFeeId')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('"personnelFeeId" cannot be empty.')
      .isUUID('4')
      .withMessage(
        '"personnelFeeId" must be a UUIDv4'
      ),
    check('userId')
      .trim()
      .notEmpty()
      .withMessage('"userId" is required.')
      .isUUID('4')
      .withMessage(
        '"userId" must be a UUIDv4'
      ),
  ],
  finalize: [
    check('reference')
      .trim()
      .notEmpty()
      .withMessage('"reference" is required.')
      .isString()
      .withMessage(
        '"reference" must be in a string format.'
      ),
  ],
  verifyRRR: [
    check('reference')
      .trim()
      .notEmpty()
      .withMessage('"reference" is required.')
      .isString()
      .withMessage(
        '"reference" must be in a string format.'
      ),
  ],
  linkPayment: [
    check('reference')
      .trim()
      .notEmpty()
      .withMessage('"reference" is required.')
      .isString()
      .withMessage(
        '"reference" must be in a string format.'
      ),
    check('userId')
      .trim()
      .notEmpty()
      .withMessage('"userId" is required.')
      .isUUID('4')
      .withMessage('"userId" must be a UUIDv4'),
    check('personnelFeeId')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('"personnelFeeId" cannot be empty.')
      .isUUID('4')
      .withMessage(
        '"personnelFeeId" must be a UUIDv4.'
      ),
    check('firmFeeId')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('"firmFeeId" cannot be empty.')
      .isUUID('4')
      .withMessage(
        '"firmFeeId" must be a UUIDv4.'
      ),
  ],
}

module.exports = (routeValidation) => [
  validationRules[routeValidation],
  validate,
]
