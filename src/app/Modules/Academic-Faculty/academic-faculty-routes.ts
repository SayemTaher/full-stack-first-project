import express from 'express';
import { validationSchemas } from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academic-faculty-controller';
import { AcademicFacultyValidation } from './academic-faculty-validation';

const router = express.Router();

// will call controller function from the controler file

router.post(
  '/create-academic-faculty',
  validationSchemas.validateRequest(
    AcademicFacultyValidation.AcademicFacultyZodValidationSchema,
  ),AcademicFacultyController.createAcademicFaculty
  
);
router.get('/', AcademicFacultyController.getAllAcademicFaculties);
router.get('/:academicFacultyId', AcademicFacultyController.getSingleAcademicFaculty);
router.patch(
  '/:academicFacultyId',
  validationSchemas.validateRequest(
    AcademicFacultyValidation.UpdateAcademicFacultyZodValidationSchema,
  ),
  AcademicFacultyController.updateSingleAcademicFaculty,
);

export const AcademicFacultyRoues = router;
