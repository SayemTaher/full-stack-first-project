import express from 'express';
import { validationSchemas } from '../../middlewares/validateRequest';
import { StudentController } from './student-controller';
import { studentSchemas } from './student-validation-zod';


const router = express.Router();

// will call controller function from the controler file


router.get('/', StudentController.getAllStudents);
router.get('/:id', StudentController.getAStudent);
router.delete('/:id', StudentController.deleteAStudent);
router.patch('/:id',validationSchemas.validateRequest(studentSchemas.updatestudentZodValidationSchema) ,StudentController.updateAStudent);

export const StudentRoutes = router;
