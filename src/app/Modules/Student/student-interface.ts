import { Schema, model, connect, Model, Types } from 'mongoose';
export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};
export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};
export type TLocalGuardian = {
  name: string;
  contactNo: string;
  occupation: string;
  address: string;
};
export type TStudent = {
  user : Types.ObjectId
  id: string;
  password : string,
  name: UserName;
  gender: 'male' | 'female';
  dateOfBirth: Date;
  contactNo: string;
  emergencyContact: string;
  email: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  presentAddress: string;
  admissionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  permanentAddress: string;
  isDeleted : boolean
};
// create a static 

export interface StudentModel extends Model<TStudent>{
  isUserExist(id : string ) : Promise<TStudent | null>
}
// create an instance
// export type StudentMethods = {
//   isUserExist(id : string): Promise<TStudent | null>
// }

// export type StudentModel = Model<TStudent,Record<string,never>,StudentMethods>