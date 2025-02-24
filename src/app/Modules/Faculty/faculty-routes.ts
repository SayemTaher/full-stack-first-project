import express from 'express';
import { validationSchemas } from '../../middlewares/validateRequest';
import { FacultyControllers } from './faculty-controller';
import { updateFacultyValidationSchema } from './faculty-validation';



const router = express.Router();

router.get(
  '/:id',

  FacultyControllers.getSingleFaculty,
);

router.patch(
  '/:id',

  validationSchemas.validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete(
  '/:id',

  FacultyControllers.deleteFaculty,
);

router.get(
  '/',

  FacultyControllers.getAllFaculties,
);

export const FacultyRoutes = router;
