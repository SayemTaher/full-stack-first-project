import { Schema, model} from 'mongoose';
import validator from 'validator';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  UserName,
} from './student-interface';



const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: [10, 'Max length is 10'],
    validate: {
      validator: function (value: string) {
        const firstnameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstnameStr === value;
      },
      message:'{VALUE} is not in the Capitalized format'
    },
  },
  lastName: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
          message:'{VALUE} is not valid',
        
      }
    },
  middleName: {
    type: String,
    required: true,
  },
});
const studentGuardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});
const studentLocalGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, trim:true, required: [true, 'First name is required'], maxlength:[20, 'Name can not be more than 20 characters'] },
  contactNo: { type: String, required: true },
  occupation: { type: String, required: true },
  address: { type: String, required: true },
});
const studentSchema = new Schema<TStudent, StudentModel>({
  user: {
    type: Schema.Types.ObjectId,
    required: [true, 'User id is required'],
    unique: true,
    ref : 'User'
  },
  id: { type: String, required: true, unique: true },
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: '{VALUE} is not valid',
    },
    required: true,
  },
  dateOfBirth: {
    type: Date,
  },
  contactNo: { type: String, required: true },
  emergencyContact: { type: String, required: true },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not a valid email type',
    },
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  guardian: {
    type: studentGuardianSchema,
    required: true,
  },
  localGuardian: {
    type: studentLocalGuardianSchema,
    required: true,
  },
  admissionSemester: {
        type: Schema.Types.ObjectId,
        ref: 'academic-semester'
  },
  academicDepartment: {
    type: Schema.Types.ObjectId,
    ref:'academic-department'
  },
  profileImg: { type: String },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  isDeleted: {
    type: Boolean,
    default : false
  }
}, {
  toJSON: {
    virtuals : true
  }
});

// virtual 
studentSchema.virtual('fullName').get(function () {
  return `${this?.name?.firstName }  ${ this?.name?.middleName }  ${ this?.name?.lastName}`;
})

// creating a custom staic method
studentSchema.statics.isUserExist = async function (id:string) {
  const existingUser = await Student.findOne({ id })
  return existingUser
}

// mongoose middleware 

// pre save middleware/hook -- for create and save

// query middleware 

// studentSchema.pre('find', function (next) {
//   this.find({isDeleted : {$ne : true}})
//   next()
// })

// studentSchema.pre('findOne', function (next) {
//   this.find({ isDeleted: { $ne: true } });
//   next();
// });
studentSchema.pre('aggregate', function (next) {
this.pipeline().unshift({$match : {isDeleted : {$ne : true}}})
next();
});

// create a model
export const Student = model<TStudent,StudentModel>('Student', studentSchema);
