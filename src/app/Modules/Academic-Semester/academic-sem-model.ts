import { Schema, model } from 'mongoose';
import {
  TAcademicSemester,
  TMonths,
  TSemesterCode,
  TSemesterSeason,
} from './academic-sem-interface';

export const months: TMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const academicSemesterSeasonName: TSemesterSeason[] = [
  'Autumn',
  'Summer',
  'Fall',
];
export const academicSemesterCode: TSemesterCode[] = ['01', '02', '03'];

const AcademicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    required: true,
    enum: academicSemesterSeasonName,
  },

  code: {
    type: String,
    required: true,
    enum: academicSemesterCode,
  },
  year: {
    required: true,
    type: String,
  },
  startMonth: {
    type: String,
    required: true,
    enum:  months,
    
  },
  endMonth: {
    type: String,
    required: true,
    enum:  months,
    
    },
    
      
  
},{
    timestamps : true
});

// check if the same semester exists before saving the doc 

AcademicSemesterSchema.pre('save', async function (next) {
    const isSemesterNameExists = await AcademicSemister.findOne({
        name: this.name,
        year: this.year
    })
    if (isSemesterNameExists) {
        throw new Error('Semester already exists');
    }
    next()
})

export const AcademicSemister = model<TAcademicSemester>(
  'academic-semester',
  AcademicSemesterSchema,
);
