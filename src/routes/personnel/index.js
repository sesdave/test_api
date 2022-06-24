const { Router } = require('express')
const authController = require('../../controllers/auth.controller')
const personnelController = require('../../controllers/personnel.controller')
const personnelMembershipController = require('../../controllers/personnelMembership.controller')
const validate = require('../../middlewares/Validator/auth')
const isAuthenticated=require('../../middlewares/isAuthenticated')
const constants=require('../../config/constants')
const isAuthorised = require('../../middlewares/isAuthorized')
 
const personnelWorkExperienceController = require('../../controllers/personnelWorkExperience.controller')
const personnelEducationController = require('../../controllers/personnelEducation.controller')

const router = Router()

router.get('/applicants', isAuthorised([constants.userTypes.Admin]), personnelController.getSelectedPersonnel)
router.put('/:personnelId',isAuthorised([constants.userTypes.Admin]), personnelController.updatePersonnel)
router.post('/signup', validate('createPersonnel'), authController.register)

router.post('/memberships', personnelMembershipController.addMemberships)
router.post('/memberships/delete',personnelMembershipController.deleteMemberships)
router.put('/memberships/:membershipId',personnelMembershipController.updateMembership)
router.get('/memberships/:personnelId',personnelMembershipController.getMemberships)
router.get('/memberships', isAuthorised([constants.userTypes.Personnel]), personnelMembershipController.getMembershipByPersonnel)

router.post('/personnel-work-experience',isAuthenticated , isAuthorised([constants.userTypes.Personnel]), personnelWorkExperienceController.addPersonnelWorkExperience)
router.post('/personnel-work-experience/delete',isAuthenticated , isAuthorised([constants.userTypes.Personnel]),personnelWorkExperienceController.deleteWorkExperience)
router.put('/personnel-work-experience/:workExperienceId',isAuthenticated , isAuthorised([constants.userTypes.Personnel]),personnelWorkExperienceController.updatePersonnelWorkExperience)
router.get('/personnel-work-experience',isAuthenticated , isAuthorised([constants.userTypes.Personnel]), personnelWorkExperienceController.getAllPersonnelWorkExperience)

router.post('/personnel-education',isAuthenticated , isAuthorised([constants.userTypes.Personnel]), personnelEducationController.addPersonnelEducation)
router.post('/personnel-education/delete',isAuthenticated , isAuthorised([constants.userTypes.Personnel]),personnelEducationController.deleteEducation)
router.put('/personnel-education/:educationId',isAuthenticated , isAuthorised([constants.userTypes.Personnel]),personnelEducationController.updatePersonnelEducation)
router.get('/personnel-education',isAuthenticated , isAuthorised([constants.userTypes.Personnel]), personnelEducationController.getAllPersonnelEducation)



// router.post(
//     '/update-password',
//     isAuthenticated,
//     isAuthorized(),
//     validate('updatePassword'),
//     buyerController.updatePassword
// );
// router.post(
//     '/forgot-password',
//     validate('forgotPassword'),
//     buyerController.setPassword
// );

module.exports = router
