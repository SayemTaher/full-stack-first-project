import { z } from 'zod';

const AcademicFacultyZodValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic faculty must be a string',
    }),
  }),
});
const UpdateAcademicFacultyZodValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic faculty must be a string',
    }).optional(),
  }),
});
export const AcademicFacultyValidation = {
  AcademicFacultyZodValidationSchema,UpdateAcademicFacultyZodValidationSchema
};
