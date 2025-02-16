import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../CustomError/app-error';
import { AcademicSemister } from '../Academic-Semester/academic-sem-model';
import { TStudent } from '../Student/student-interface';
import { Student } from '../Student/student-model';
import { TUser } from './user-interface';
import { User } from './user-model';
import { generateStudentId } from './user-utilities';
import httpStatus from 'http-status';
const createStudentIntoDB = async (password: string, payload: TStudent) => {
  if (!password || typeof password !== 'string') {
    throw new Error('Password must be a valid string');
  }

  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);

  //  find academic semester info
  const admissionSemesterId = await AcademicSemister.findById(
    payload.admissionSemester,
  );
// start the isolated session here
    const session = await mongoose.startSession()
    
    try {
        session.startTransaction() //starting the transaction here
        userData.role = 'student';
        userData.id = await generateStudentId(admissionSemesterId);

        // Create a user ( transaction 1 starts as here we are writing on the database)
        const newUser = await User.create([userData],{session}); // for session data we must use array here

        if (!newUser.length) {
          // if (Object.keys(newUser).length) {
          throw new AppError(httpStatus.BAD_REQUEST,'Failed to create an user')
        }
        payload.id = newUser[0].id
        payload.user = newUser[0]._id
        //  starting transaction 2 
        const newStudent = await Student.create([payload], { session });
        if (!newStudent.length) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create a new student')
        }
        await session.commitTransaction()
        await session.endSession()
        return newStudent;
        
    } catch(err) {
        await session.abortTransaction()
        await session.endSession()
        throw new Error('Failed to delete user');
    }
  
};

export const UserService = {
  createStudentIntoDB,
};
