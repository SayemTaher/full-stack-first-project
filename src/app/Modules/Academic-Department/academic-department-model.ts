import { model, Schema } from "mongoose";

import { TAcademicDepartment } from "./academic-department-interface";
import httpStatus from 'http-status';
import AppError from "../../CustomError/app-error";
const academicDepartmentSchema = new Schema<TAcademicDepartment>({
    name: {
        type: String,
        unique: true,
        required : true
    }, 
    academicFaculty: {
        type: Schema.Types.ObjectId,
        ref: 'academic-faculty'
    }

    
}, {
    timestamps : true
})
academicDepartmentSchema.pre('save', async function (next) {
  const checkIfDepartmentExists = await AcademicDepartmentModel.findOne({
    name: this.name,
  });
  if (checkIfDepartmentExists) {
    throw new Error('This department already exists');
  }
  next();
});

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
    const query = this.getQuery()

    const isDepartmentExist = await AcademicDepartmentModel.findOne(query)

    if (!isDepartmentExist) {
        throw new AppError(httpStatus.NOT_FOUND ,'This department does not exist')
    }
    next();
})

export const AcademicDepartmentModel = model<TAcademicDepartment>('academic-department', academicDepartmentSchema)

