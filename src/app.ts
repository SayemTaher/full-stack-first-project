import express  from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';
const app = express();
// parser
app.use(express.json());
// middleware
app.use(cors());
// application routes 
app.use('/api/v1/students', router)
app.use('/api/v1/users', router);
app.use('/api/v1/semesters', router)
app.use('/api/v1/academicFaculty', router)
app.use('/api/v1/academicDepartment', router);
 // these are first routes
app.use(globalErrorHandler) 
export default app;
