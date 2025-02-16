import express, { NextFunction } from 'express';
import { AnyZodObject } from 'zod';
import { validationSchemas } from '../../middlewares/validateRequest';
import { studentSchemas } from '../Student/student-validation-zod';
import { UserController } from './user-controller';


const router = express.Router();

// will call controller function from the controler file


// this route is the final route for the url
router.post('/create-user',validationSchemas.validateRequest(studentSchemas.studentCreateZodValidationSchema), UserController.createStudent);


export const userRoutes = router;
