import httpStatus from 'http-status';
import AppError from '../../CustomError/app-error';
import QueryBuilder from '../../Query-Builder/QueryBuilder';
import { AcademicSemister } from '../Academic-Semester/academic-sem-model';
import { TSemesterRegistration } from './semesterRegistration-interface';
import { SemesterRegistration } from './semesterRegistration-model';

const createSemesterRegistrationInDb = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;
  //check if the semester exist
  const isAcademicSemesterExist =
    await AcademicSemister.findById(academicSemester);

  if (!isAcademicSemesterExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This academic semester does not exist!',
    );
  }
  const isSemesterAlreadyExist = await SemesterRegistration.findOne({
    academicSemester,
  });
  if (isSemesterAlreadyExist) {
    throw new AppError(httpStatus.CONFLICT, 'This semester already exists');
  }
  const result = await SemesterRegistration.create(payload);
  return result;
};
const getAllSemesterRegistrationsFromDb = async (query: Record<string, unknown>) => {
    const semesterRegistrationQuery = new QueryBuilder(SemesterRegistration.find().populate('academicSemester'), query).filter().sort().paginate().fields()
    const result = await semesterRegistrationQuery.modelQuery;
    return result
};

const getSingleSemesterRegistrationFromDb = async (id: string) => {
    const result = await SemesterRegistration.findById(id)
    return result
};
const updateSemesterRegistrationIntoDb = async () => {
    
};
export const SemesterRegistrationService = {
  createSemesterRegistrationInDb,
  getAllSemesterRegistrationsFromDb,
  getSingleSemesterRegistrationFromDb,
  updateSemesterRegistrationIntoDb,
};
