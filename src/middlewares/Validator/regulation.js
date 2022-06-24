const { check, oneOf } = require('express-validator')
const validate = require('./baseValidator')

const validationRules = {
  regualtionId: [
    check('regulation ID')
      .trim()
      .notEmpty()
      .withMessage('"regulation ID" is required.')
      .isUUID('4')
      .withMessage('"regulation ID" must be a UUIDv4'),
  ],
  create: [
    check('entityName')
      .trim()
      .notEmpty()
      .withMessage('Entity name is required.')
      .isString()
      .withMessage(
        'Entity name must be in a string format.'
      ),
    check('entityType')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('Entity type can not be empty. It must be either a firm or a personnel')
      .isString()
      .withMessage(
        'Entity type must be in a string format.'
      ),
    check('description')
      .trim()
      .notEmpty()
      .withMessage('Description can not be empty.')
      .isString()
      .withMessage(
        'Description must be in a string format.'
      ),
    check('reporterEmail')
      .trim()
      .notEmpty()
      .withMessage('Reporter email can not be empty.')
      .isString()
      .withMessage(
        'Reporter email must be in a string format.'
      ),
    check('reporterPhone')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('Reporter phone can not be empty.')
      .isString()
      .withMessage(
        'Reporter phone must be in a string format.'
      ),
    check('state')
      .trim()
      .notEmpty()
      .withMessage('State can not be empty.')
      .isString()
      .withMessage(
        'State must be in a string format.'
      ),
    check('address')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('Address can not be empty.')
      .isString()
      .withMessage(
        'Address must be in a string format.'
      ),
    check('entityContact')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('Entity phone number can not be empty.')
      .isString()
      .withMessage(
        'Entity phone number must be in a string format.'
      ),
  ],
  update: [
    check('entityName')
      .trim()
      .notEmpty()
      .optional()
      .withMessage('Entity name is required.')
      .isString()
      .withMessage(
        'Entity name must be in a string format.'
      ),
    check('entityType')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('Entity type can not be empty. It must be either a firm or a personnel')
      .isString()
      .withMessage(
        'Entity type must be in a string format.'
      ),
    check('description')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('Description can not be empty.')
      .isString()
      .withMessage(
        'Description must be in a string format.'
      ),
    check('reporterEmail')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('Reporter email can not be empty.')
      .isString()
      .withMessage(
        'Reporter email must be in a string format.'
      ),
    check('reporterPhone')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('Reporter phone can not be empty.')
      .isString()
      .withMessage(
        'Reporter phone must be in a string format.'
      ),
    check('state')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('State can not be empty.')
      .isString()
      .withMessage(
        'State must be in a string format.'
      ),
    check('address')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('Address can not be empty.')
      .isString()
      .withMessage(
        'Address must be in a string format.'
      ),
    check('status')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('status can not be empty.')
      .isString()
      .withMessage(
        'status must be in a string format.'
      ),
    check('userId')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('User ID can not be empty.')
      .isUUID('4')
      .withMessage(
        'User ID must be in a string format.'
      ),
    check('entityContact')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('Entity phone number can not be empty.')
      .isString()
      .withMessage(
        'Entity phone number must be in a string format.'
      ),
    check('action')
      .trim()
      .optional()
      .notEmpty()
      .withMessage('Entity phone number can not be empty.')
      .isString()
      .withMessage(
        'Entity phone number must be in a string format.'
      ),
  ],
}

module.exports = (routeValidation) => [
  validationRules[routeValidation],
  validate,
]
