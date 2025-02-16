import { z } from 'zod';

// Guardian Schema
const guardianValidationSchema = z.object({
  fatherName: z.string().nonempty('Father name is required'),
  fatherOccupation: z.string().nonempty('Father occupation is required'),
  fatherContactNo: z.string().nonempty('Father contact number is required'),
  motherName: z.string().nonempty('Mother name is required'),
  motherOccupation: z.string().nonempty('Mother occupation is required'),
  motherContactNo: z.string().nonempty('Mother contact number is required'),
});

// UserName Schema
const userNameValidationSchema = z.object({
  firstName: z.string().nonempty('First name is required'),
  middleName: z.string().nonempty('Middle name is required'),
  lastName: z.string().nonempty('Last name is required'),
});

// LocalGuardian Schema
const localguardianValidationSchema = z.object({
  name: z.string().nonempty('Local guardian name is required'),
  contactNo: z.string().nonempty('Local guardian contact number is required'),
  occupation: z.string().nonempty('Local guardian occupation is required'),
  address: z.string().nonempty('Local guardian address is required'),
});

// Main Student Schema
const studentCreateZodValidationSchema = z.object({
  body: z.object({
    password: z.string(),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female'], {
        errorMap: () => ({
          message: 'Gender must be either "male" or "female"',
        }),
      }),
      dateOfBirth: z.string().optional(),
      contactNo: z.string().nonempty('Contact number is required'),
      emergencyContact: z
        .string()
        .nonempty('Emergency contact number is required'),
      email: z
        .string()
        .email('Email must be a valid email address')
        .nonempty('Email is required'),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      guardian: guardianValidationSchema,
      admissionSemester: z.string(),
      academicDepartment : z.string(),
      localGuardian: localguardianValidationSchema,
      profileImg: z.string().optional(), // Optional string for profile image
      presentAddress: z.string().nonempty('Present address is required'),
      permanentAddress: z.string().nonempty('Permanent address is required'),
    }),
  }),
});
// Guardian Schema (All Fields Optional)
const updateguardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

// UserName Schema (All Fields Optional)
const updateuserNameValidationSchema = z.object({
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});

// LocalGuardian Schema (All Fields Optional)
const updatelocalguardianValidationSchema = z.object({
  name: z.string().optional(),
  contactNo: z.string().optional(),
  occupation: z.string().optional(),
  address: z.string().optional(),
});

// Main Student Schema (All Fields Optional)
const updatestudentZodValidationSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z
      .object({
        name: updateuserNameValidationSchema.optional(),
        gender: z.enum(['male', 'female']).optional(),
        dateOfBirth: z.string().optional(),
        contactNo: z.string().optional(),
        emergencyContact: z.string().optional(),
        email: z.string().email('Invalid email format').optional(),
        bloodGroup: z
          .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
          .optional(),
        guardian: updateguardianValidationSchema.optional(),
        admissionSemester: z.string().optional(),
        academicDepartment: z.string().optional(),
        localGuardian: updatelocalguardianValidationSchema.optional(),
        profileImg: z.string().optional(),
        presentAddress: z.string().optional(),
        permanentAddress: z.string().optional(),
      })
      .optional(),
  }),
});
export const studentSchemas = {
  studentCreateZodValidationSchema,updatestudentZodValidationSchema
} 
