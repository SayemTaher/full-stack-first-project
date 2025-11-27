import express from 'express';
import { validationSchemas } from '../../middlewares/validateRequest';
import { CourseController } from './course-controller';
import { courseValidationSchemas } from './course-validation';


const router = express.Router();
router.post(
  '/create-course',validationSchemas.validateRequest(courseValidationSchemas.createCourseValidation), CourseController.createCourse
);
router.patch(
  '/:courseId',
  validationSchemas.validateRequest(
    courseValidationSchemas.updateCourseValidation,
  ), CourseController.updateSingleCourse
)
 
router.get(
  '/:id',
  CourseController.getSingleCourse,
);

router.delete(
  '/:id',
    validationSchemas.validateRequest(courseValidationSchemas.updateCourseValidation), CourseController.deleteSingleCourse
)

router.get(
  '/',
  CourseController.getAllCourses,
);
router.put('/:courseId/assign-faculties', validationSchemas.validateRequest(courseValidationSchemas.CourseFacultyValidation), CourseController.assignFaculties)
router.put(
  '/:courseId/remove-faculties',
  validationSchemas.validateRequest(
    courseValidationSchemas.CourseFacultyValidation,
  ),
  CourseController.removeFaculties,
);
export const CourseRoutes = router;
