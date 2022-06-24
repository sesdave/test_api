const { check, oneOf } = require('express-validator')
const validate = require('./baseValidator')

const validationRules = {
	createPersonnel: [
		check('firstName')
			.trim()
			.notEmpty()
			.withMessage('FIRST NAME is required')
			.isString()
			.withMessage('FIRST NAME must be in a string format.'),
		check('lastName')
			.trim()
			.notEmpty()
			.withMessage('LAST NAME is required')
			.isString()
			.withMessage('LAST NAME must be in a string format.'),
		check('otherNames')
			.trim()
			.optional()
			.notEmpty()
			.withMessage('OTHER NAME cannot be empty')
			.isString()
			.withMessage('OTHER NAME must be in a string format.'),
		check('userType')
			.trim()
			.notEmpty()
			.withMessage('USER TYPE is required.')
			.isIn(['Personnel'])
			.withMessage('USER TYPE must be "Personnel"'),
		check('password')
			.trim()
			.notEmpty()
			.withMessage('PASSWORD is required.')
			.matches('(?=.{6,})')
			.withMessage('PASSWORD must be six characters or longer.')
			.matches('(?=.*[a-z])')
			.withMessage(
				'PASSWORD must contain at least 1 lowercase alphabetical character.'
			)
			.matches('(?=.*[A-Z])')
			.withMessage(
				'PASSWORD must contain at least 1 uppercase alphabetical character.'
			)
			.matches('(?=.*[0-9])')
			.withMessage('PASSWORD must contain at least 1 numeric character.')
			.matches('(?=.*[!@#$%^&*])')
			.withMessage(
				'PASSWORD must contain at least one of these special characters-->!@#$%^&*.'
			),
		check('proposer1')
			.trim()
			.notEmpty()
			.withMessage('PROPOSER 1 cannot be empty')
			.isString()
			.withMessage('PROPOSER 1 must be in a string format.'),
		check('proposer2')
			.trim()
			.notEmpty()
			.withMessage('PROPOSER 2 cannot be empty')
			.isString()
			.withMessage('PROPOSER 2 must be in a string format.'),
		check('practiceState')
			.trim()
			.notEmpty()
			.withMessage('PRACTICE STATE cannot be empty')
			.isString()
			.withMessage('PRACTICE STATE must be in a string format.'),
		check('personnelCatId')
			.trim()
			.notEmpty()
			.withMessage('PERSONNEL CATEGORY cannot be empty')
			.isString()
			.withMessage('PERSONNEL CATEGORY must be in a string format.'),
		check('liveAndWorkInNigeria')
			.notEmpty()
			.withMessage('"liveAndWorkInNigeria" cannot be empty')
			.isBoolean()
			.withMessage('"liveAndWorkInNigeria" must be in a boolean format.'),
		check('isProfessionalBodyMember')
			.optional()
			.notEmpty()
			.withMessage('"isProfessionalBodyMember" cannot be empty')
			.isBoolean()
			.withMessage(
				'"isProfessionalBodyMember" must be in a boolean format.'
			),
		check('professionalBody')
			.trim()
			.optional()
			.notEmpty()
			.withMessage('"professionalBody" cannot be empty')
			.isString()
			.withMessage('"professionalBody" must be in a string format.'),
		check('professionalMembershipNumber')
			.trim()
			.optional()
			.notEmpty()
			.withMessage('"professionalMembershipNumber" cannot be empty')
			.isString()
			.withMessage(
				'"professionalMembershipNumber" must be in a string format.'
			),
		check('engineeringBase')
			.trim()
			.notEmpty()
			.withMessage('"engineeringBase" cannot be empty')
			.isString()
			.withMessage('"engineeringBase" must be in a string format.'),
		check('engineeringField')
			.trim()
			.notEmpty()
			.withMessage('"engineeringField" cannot be empty')
			.isString()
			.withMessage('"engineeringField" must be in a string format.'),
		check('address')
			.trim()
			.notEmpty()
			.withMessage('"address" cannot be empty')
			.isString()
			.withMessage('"address" must be in a string format.'),
		check('isCorenMember')
			.trim()
			.notEmpty()
			.withMessage('"isCorenMember" cannot be empty')
			.isBoolean()
			.withMessage('"isCorenMember" must be in a boolean format.'),
		check('applicationStatus')
			.trim()
			.optional()
			.notEmpty()
			.withMessage('"applicationStatus" cannot be empty')
			.isString()
			.withMessage('"applicationStatus" must be in a string format.'),
	],
}

module.exports = (routeValidation) => [
	validationRules[routeValidation],
	validate,
]
