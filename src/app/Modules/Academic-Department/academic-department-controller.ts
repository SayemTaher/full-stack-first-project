import sendResponse from '../../utilities/send-response';
import httpStatus from 'http-status';
import catchAsync from '../../utilities/catch-async';
import { AcademicDepartmentServices } from './academic-department-services';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await AcademicDepartmentServices.createAcademicDepartmentInDb(data);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Academic Department is created successfully!!',
    success: true,
    data: result,
  });
});

const getAllAcademicDepartments = catchAsync(async (req, res) => {
  const data = await AcademicDepartmentServices.getAllAcademicDepartmentFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'All academic department data retrieved successfully!!',
    success: true,
    data: data,
  });
});
const getSingleAcademicDepartmentData = catchAsync(async (req, res) => {
  const id = req.params.academicDepartmentId;
  const data =
    await AcademicDepartmentServices.getSingleAcademicDepartmentDataFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Data retrieved successfully!!',
    success: true,
    data: data,
  });
});

const updateSingleAcademicDepartment = catchAsync(async (req, res) => {
  const id = req.params.academicDepartmentId;
  const data =
    await AcademicDepartmentServices.updateSingleAcademicDepartmentDataInDb(
      id,
      req.body,
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Data updated successfully!!',
    success: true,
    data: data,
  });
});

export const AcademicDepartmentController = {
  createAcademicDepartment,getAllAcademicDepartments,getSingleAcademicDepartmentData,updateSingleAcademicDepartment
};
