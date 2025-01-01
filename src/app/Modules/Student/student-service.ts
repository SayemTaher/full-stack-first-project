// import { Student } from './student-interface';
import { TStudent } from './student-interface';
import { Student } from './student-model';

const createStudentIntoDB = async (studentData: TStudent) => {
  // custom static method
  if (await Student.isUserExist(studentData.id)) {
    throw new Error('User already exist');
  }
  const result = await Student.create(studentData); // built in static method
  return result;

  //  built in instance method 

  // const student = new Student(studentData); // create an instance 

  // if (await student.isUserExist(studentData.id)) {
  //   throw new Error('User already exist')
  // }
  // const result = await student.save();
  // return result
};
const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};
const getAStudentsFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  // using aggregate 
  const result = await Student.aggregate([{
    $match : {id : id}
  }])
  return result;
};
const deleteAStudentsFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, {isDeleted : true});
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getAStudentsFromDB,
  deleteAStudentsFromDB

};
