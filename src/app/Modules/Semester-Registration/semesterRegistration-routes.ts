import express from 'express';
import { validationSchemas } from '../../middlewares/validateRequest';
import { semesterRegistrationController } from './semesterRegistration-controller';
import { semesterRegistrationValidation } from './semesterRegistration-validate';
const router = express.Router();
router.post('/create-semester-registration', validationSchemas.validateRequest(semesterRegistrationValidation.createSemesterRegistrationValidationSchema), semesterRegistrationController.createSemesterRegistration);
router.get('/',semesterRegistrationController.getAllSemesterRegistration)
router.get('/:id', semesterRegistrationController.getSingleSemesterRegistration)

router.patch('/:id')


export const semesterRegistrationRoutes = router
