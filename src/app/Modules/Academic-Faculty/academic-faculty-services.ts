import { TAcademicFaculty } from "./academic-faculty-interface";
import { AcademicFaculty } from "./academic-faculty-model";


const createAcademicFacultyInDb = async (payload: TAcademicFaculty) => {
  
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllAcademicFacultiesFromDb = async () => {
  const data =await AcademicFaculty.find();
  return data;
};

const getSingleAcademicFacultyDataFromDb = async (id: string) => {
  const data = await AcademicFaculty.findById(id);
  return data;
};

const updateSingleAcademicFacultyDataInDb = async (
  id: string,
  payload: Partial<TAcademicFaculty>,
) => {
  const data = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return data;
};

export const AcademicFacultyServices = {
    createAcademicFacultyInDb,getAllAcademicFacultiesFromDb,getSingleAcademicFacultyDataFromDb,updateSingleAcademicFacultyDataInDb
};
