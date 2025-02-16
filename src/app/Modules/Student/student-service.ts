// import { Student } from './student-interface';
import mongoose, { ObjectId } from 'mongoose';
import AppError from '../../CustomError/app-error';
import { TStudent } from './student-interface';
import { Student } from './student-model';
import httpStatus from 'http-status';
import { User } from '../User/user-model';
import { object } from 'joi';
const getAllStudentsFromDB = async () => {
  const result = await Student.find().populate('admissionSemester').populate({
    path: 'academicDepartment',
    populate: {
      path:'academicFaculty'
    }
  });
  return result;
};
const getAStudentsFromDB = async (id : string) => {
  // const result = await Student.findOne({ id });
  // using aggregate 
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};
const updateAStudentsFromDB = async (id: string, payload: Partial<TStudent>) => {
  
  const { name,...remainingData } = payload

  const requestedModifiedData: Record<string, unknown> = {
    ...remainingData
  }
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      requestedModifiedData[`name.${key}`] = value
    }
  }
  // this goes for other non-primitive fields as well

  const result = await Student.findOneAndUpdate({ id }, requestedModifiedData, { new: true, runValidators : true })
  return result;
};
// const deleteAStudentsFromDB = async (id: string) => {
//   const result = await Student.updateOne({ id }, { isDeleted: true });
//   return result;
// };
const deleteAStudentsFromDB = async (id: string) => {
  const isUserExist = await Student.findOne({id : id })
  if (!isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This student does not exist')
  }
  const session = await mongoose.startSession()
  try {

    session.startTransaction()
    const deletedStudent = await Student.findOneAndUpdate({ id }, { isDeleted: true }, { new: true, session });
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST,'Failed to delete student')
    }
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }
    await session.commitTransaction()
    await session.endSession()

    return deletedStudent
  }
  catch(error) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error('Failed to delete user')
  }
}


export const StudentServices = {
  getAllStudentsFromDB,
  getAStudentsFromDB,
  deleteAStudentsFromDB,
  updateAStudentsFromDB

};
