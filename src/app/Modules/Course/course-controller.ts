import catchAsync from "../../utilities/catch-async";
import sendResponse from "../../utilities/send-response";
import { CourseServices } from "./course-services";
import httpStatus from 'http-status';

const createCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.createCourseInDb(req.body)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Course is created successfully!!',
      success: true,
      data: result,
    });
})

const getAllCourses = catchAsync(async (req, res) => {
    const result = await CourseServices.getAllCourseFromDb(req.query)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'All courses retrieved successfully!!',
      success: true,
      data: result,
    });
})
const getSingleCourse = catchAsync(async (req, res) => {
    const id = req.params.id 
    const result = await CourseServices.getSingleCourseFromDb(id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Course retrieved successfully!!',
      success: true,
      data: result,
    });
})
const updateSingleCourse = catchAsync(async (req, res) => {
    const id = req.params.courseId;
    console.log(id)
  const result = await CourseServices.updateCourseInDb(id,req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Course updated successfully!!',
    success: true,
    data: result,
  });
});
const deleteSingleCourse = catchAsync(async (req, res) => {
    const id = req.params.id 
    const result = await CourseServices.deleteCourseFromDb(id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      message: 'Course Deleted successfully!!',
      success: true,
      data: result,
    });
})

export const CourseController = {
    createCourse, getAllCourses,getSingleCourse,deleteSingleCourse,updateSingleCourse
}