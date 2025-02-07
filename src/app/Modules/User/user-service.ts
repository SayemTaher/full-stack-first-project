import config from '../../config';
import { AcademicSemister } from '../Academic-Semester/academic-sem-model';
import { TStudent } from '../Student/student-interface';
import { Student } from '../Student/student-model';
import { TUser } from './user-interface';
import { User } from './user-model';
import { generateStudentId } from './user-utilities';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  if (!password || typeof password !== 'string') {
    throw new Error('Password must be a valid string');
  }

  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_password as string);

  //  find academic semester info
  const admissionSemesterId = await AcademicSemister.findById(
    payload.admissionSemester,
  );

  userData.role = 'student';
  userData.id = await generateStudentId(admissionSemesterId);

  // Create a user
  const newUser = await User.create(userData);

  if (Object.keys(newUser).length) {
    // Set id and _id as user reference
    payload.id = newUser.id;
    payload.user = newUser._id;

    const newStudent = await Student.create(payload);
    console.log(newStudent);
    return newStudent;
  }
};

export const UserService = {
  createStudentIntoDB,
};
