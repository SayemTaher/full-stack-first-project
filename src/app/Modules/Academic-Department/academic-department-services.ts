import { TAcademicDepartment } from "./academic-department-interface";
import { AcademicDepartmentModel } from "./academic-department-model";


const createAcademicDepartmentInDb = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartmentModel.create(payload);
  return result;
};

const getAllAcademicDepartmentFromDb = async () => {
  const data = await AcademicDepartmentModel.find().populate('academicFaculty');;
  return data;
};

const getSingleAcademicDepartmentDataFromDb = async (id: string) => {
  const data =
    await AcademicDepartmentModel.findById(id).populate('academicFaculty');;
  return data;
};

const updateSingleAcademicDepartmentDataInDb = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const data = await AcademicDepartmentModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return data;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentInDb,getSingleAcademicDepartmentDataFromDb,getAllAcademicDepartmentFromDb,updateSingleAcademicDepartmentDataInDb
};
