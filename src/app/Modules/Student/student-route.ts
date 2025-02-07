import express from 'express';
import { StudentController } from './student-controller';

const router = express.Router();

// will call controller function from the controler file


router.get('/', StudentController.getAllStudents);
router.get('/:studentId', StudentController.getAStudent);
router.delete('/:studentId', StudentController.deleteAStudent);

export const StudentRoutes = router;
