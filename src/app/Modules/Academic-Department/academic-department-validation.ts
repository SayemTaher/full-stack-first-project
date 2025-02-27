import { z } from 'zod';

const AcademicDepartmentZodValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Department must be a string',
      required_error: 'Name is required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic Department must be a string',
      required_error: 'Faculty id is required',
    }),
  }),
});
const UpdateAcademicDepartmentZodValidationSchema = z.object({
  body: z.object({
    name: z.string({
        invalid_type_error: 'Academic Department must be a string',
        required_error : 'Name is required'
    }).optional(),
    academicFaculty: z.string({
        invalid_type_error: 'Academic Department must be a string',
        required_error : 'Faculty id is required'
    }).optional(),
  }),
});
export const AcademicDepartmentValidation = {
 AcademicDepartmentZodValidationSchema,UpdateAcademicDepartmentZodValidationSchema
};
