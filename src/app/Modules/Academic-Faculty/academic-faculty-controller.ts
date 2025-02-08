import sendResponse from '../../utilities/send-response';
import httpStatus from 'http-status';
import catchAsync from '../../utilities/catch-async';
import { AcademicFacultyServices } from './academic-faculty-services';


const createAcademicFaculty = catchAsync(async (req, res) => {
    const data = req.body
  const result = await AcademicFacultyServices.createAcademicFacultyInDb(
    data
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Academic faculty is created successfully!!',
    success: true,
    data: result,
  });
});

const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const data = await AcademicFacultyServices.getAllAcademicFacultiesFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'All academic faculty data retrieved successfully!!',
    success: true,
    data: data,
  });
});
const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const id = req.params.academicFacultyId;
  const data = await AcademicFacultyServices.getSingleAcademicFacultyDataFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Data retrieved successfully!!',
    success: true,
    data: data,
  });
});

const updateSingleAcademicFaculty = catchAsync(async (req, res) => {
  const id = req.params.academicFacultyId;
  const data = await AcademicFacultyServices.updateSingleAcademicFacultyDataInDb(
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

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateSingleAcademicFaculty,
};
