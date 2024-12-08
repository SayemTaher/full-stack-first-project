import { Request, Response } from 'express';
import { StudentServices } from './student-service';

const createStudent = async (req: Request, res: Response) => {
  try {
    // send response
    const studentData = req.body.student;
    // will call service func to process this data
    const result = await StudentServices.createStudentIntoDB(studentData);
    //  send response
    res.status(200).json({
      success: true,
      message: 'Student is created successfully!!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const getAllStudents = async (req: Request, res: Response) => {
  try {
    // send response

    // will call service func to process this data
    const result = await StudentServices.getAllStudentsFromDB();
    //  send response
    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully!!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
// single student
const getAStudent = async (req: Request, res: Response) => {
  try {
    // send response
    const studentId = req.params.studentId;
    // will call service func to process this data
    const result = await StudentServices.getAStudentsFromDB(studentId);
    //  send response
    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully!!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getAStudent,
};
