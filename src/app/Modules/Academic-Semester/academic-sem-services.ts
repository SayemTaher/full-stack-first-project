import { TAcademicSemester } from './academic-sem-interface';
import { AcademicSemister } from './academic-sem-model';

const createAcademicSemesterInDb = async (payload: TAcademicSemester) => {
  type TAcademicSemesterCode = {
    [key: string]: string;
  };
  const academicSemsterCodeMapper: TAcademicSemesterCode = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
  };
  if (academicSemsterCodeMapper[payload.name] !== payload.code) {
    throw new Error('Academic semester code is invalid');
  }
  const result = await AcademicSemister.create(payload);
  console.log(result);
  return result;
};

const getAllAcademicSemesterFromDb = async () => {
  const data = await AcademicSemister.find();
  return data;
};

const getSingleSemesterDataFromDb = async (id: string) => {
  const data = await AcademicSemister.findById(id);
  return data;
};

const updateSingleDataInDb = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  type TAcademicSemesterCode = {
    [key: string]: string;
  };
  const academicSemesterCodeMapper: TAcademicSemesterCode = {
    Autumn: '01',
    Summer: '02',
    Fall: '03',
  };
  if (
    payload.name &&
    payload.code &&
    academicSemesterCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid semester code');
  }

  const data = await AcademicSemister.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return data;
};

export const AcademicSemesterServices = {
  createAcademicSemesterInDb,
  getAllAcademicSemesterFromDb,
  getSingleSemesterDataFromDb,
  updateSingleDataInDb,
};
