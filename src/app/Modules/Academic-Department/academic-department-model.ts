import { model, Schema } from "mongoose";
import { TAcademicDepartment } from "./academic-department-interface";

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

export const AcademicDepartmentModel = model<TAcademicDepartment>('academic-department', academicDepartmentSchema)