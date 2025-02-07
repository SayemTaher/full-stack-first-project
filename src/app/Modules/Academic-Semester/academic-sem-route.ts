import express from 'express';
import { validationSchemas } from '../../middlewares/validateRequest';
import { AcademicSemesterController } from './academic-sem-controller';
import { AcademicSemesterValidation } from './academic-semester-validation';

const router = express.Router();

// will call controller function from the controler file

router.post(
  '/create-academic-semester',
  validationSchemas.validateRequest(
    AcademicSemesterValidation.createAcademicSemesterZodValidation,
  ),
  AcademicSemesterController.createAcademicSemester,
);
router.get('/', AcademicSemesterController.getAllAcademicSemesterData)
router.get('/:semesterId', AcademicSemesterController.getSingleSemesterData)
router.patch('/:semesterId',validationSchemas.validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodValidation), AcademicSemesterController.updateSingleSemesterData)

export const AcademicSemesterRoutes = router;
