import { NextFunction, Request, RequestHandler, Response } from 'express';
import sendResponse from '../../utilities/send-response';
import { StudentServices } from './student-service';
import httpStatus from 'http-status';
import catchAsync from '../../utilities/catch-async';



const getAllStudents : RequestHandler = catchAsync(async (req, res ) => {
    const result = await StudentServices.getAllStudentsFromDB(req.query);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'All students retrieved successfully!!',
      success: true,
      data: result,
    });
  
})

// single student
const getAStudent = catchAsync(async(req, res ) => {
  const studentId = req.params.studentId;
  if (!studentId) {
    throw new Error('Student Id could not be found')
  }
    const result = await StudentServices.getAStudentsFromDB(studentId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Student is retrieved successfully!!',
      success: true,
      data: result,
    });
}) 
// delete a student
const deleteAStudent = catchAsync(async (req, res) => {
  const studentId = req.params.studentId;
  if (!studentId) {
     throw new Error('Student Id could not be found');
  }
  const result = await StudentServices.deleteAStudentsFromDB(studentId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Student is deleted successfully!!',
    success: true,
    data: result,
  });
});
const updateAStudent = catchAsync(async (req, res) => {
  const studentId = req.params.studentId;
  const data = req.body.student
  if (!studentId) {
    throw new Error('Student Id could not be found');
  }
  const result = await StudentServices.updateAStudentsFromDB(studentId, data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Student is updated successfully!!',
    success: true,
    data: result,
  });
});


export const StudentController = {

  getAllStudents,
  getAStudent,
  deleteAStudent,
  updateAStudent
};
