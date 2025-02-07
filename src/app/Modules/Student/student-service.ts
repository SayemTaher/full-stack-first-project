// import { Student } from './student-interface';
import { ObjectId } from 'mongoose';
import { TStudent } from './student-interface';
import { Student } from './student-model';

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};
const getAStudentsFromDB = async (id : string) => {
  // const result = await Student.findOne({ id });
  // using aggregate 
  const result = await Student.aggregate([{
    $match : {id : id}
  }])
  return result;
};
const deleteAStudentsFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getAStudentsFromDB,
  deleteAStudentsFromDB

};
