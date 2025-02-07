import { z } from 'zod';
import {
  academicSemesterCode,
  academicSemesterSeasonName,
  months,
} from './academic-sem-model';

const createAcademicSemesterZodValidation = z.object({
  body: z.object({
    name: z.enum([...academicSemesterSeasonName] as [string, ...string[]]),
    code: z.enum([...academicSemesterCode] as [string, ...string[]]),
    year: z.string(),
    startMonth: z.enum([...months] as [string, ...string[]]),
    endMonth: z.enum([...months] as [string, ...string[]]),
  }),
});
const updateAcademicSemesterZodValidation = z.object({
  body: z.object({
    name: z.enum([...academicSemesterSeasonName] as [string, ...string[]]).optional(),
    code: z.enum([...academicSemesterCode] as [string, ...string[]]).optional(),
    year: z.string().optional(),
    startMonth: z.enum([...months] as [string, ...string[]]).optional(),
    endMonth: z.enum([...months] as [string, ...string[]]).optional(),
  }),
});
export const AcademicSemesterValidation = {
  createAcademicSemesterZodValidation,updateAcademicSemesterZodValidation
};
