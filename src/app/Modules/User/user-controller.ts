import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserService } from "./user-service";
import httpStatus from 'http-status';
import sendResponse from "../../utilities/send-response";
import catchAsync from "../../utilities/catch-async";

const createStudent = catchAsync(async (req, res) => {
  const { password, student } = req.body;
  const result = await UserService.createStudentIntoDB(password, student);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'student created successfully',
    success: true,
    data: result,
  });
});  
export const UserController = {
    createStudent
}
   