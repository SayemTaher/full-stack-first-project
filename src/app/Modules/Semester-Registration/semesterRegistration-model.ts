import { number } from 'joi';
import mongoose, { Schema } from 'mongoose';
import { semesterRegistrationStatus } from './semesterRegistration-constants';
import { TSemesterRegistration } from './semesterRegistration-interface';

const semesterRegistrationSchema = new mongoose.Schema<TSemesterRegistration>({
  academicSemester: {
    type: Schema.Types.ObjectId,
    unique: true,
    required: true,
    ref: 'academic-semester',
    },
    status: {
        type: String,
        enum: semesterRegistrationStatus,
        default : 'UPCOMING'
    },
    startDate: {
        type: Date,
        required : true
    },
    endDate: {
        type: Date,
        required :true
    },
    minCredit: {
        type: Number,
        default : 3
    },
    maxCredit: {
        type: Number,
        default : 15
    }

}, {
    timestamps : true
});
export const SemesterRegistration = mongoose.model<TSemesterRegistration>('semester-registration', semesterRegistrationSchema)
