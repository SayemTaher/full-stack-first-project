import express from 'express';
import { validationSchemas } from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academic-department-controller';
import { AcademicDepartmentValidation } from './academic-department-validation';


const router = express.Router();

// will call controller function from the controler file

router.post(
  '/create-academic-department',
  validationSchemas.validateRequest(
    AcademicDepartmentValidation.AcademicDepartmentZodValidationSchema,
  ),
  AcademicDepartmentController.createAcademicDepartment,
);
router.get('/', AcademicDepartmentController.getAllAcademicDepartments);
router.get(
  '/:academicDepartmentId',
  AcademicDepartmentController.getSingleAcademicDepartmentData,
);
router.patch(
  '/:academicDepartmentId',
  validationSchemas.validateRequest(
    AcademicDepartmentValidation.UpdateAcademicDepartmentZodValidationSchema,
  ),
  AcademicDepartmentController.updateSingleAcademicDepartment,
);

export const AcademicDepartmentRoutes = router;
