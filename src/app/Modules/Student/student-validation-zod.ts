import { z } from 'zod';

// Guardian Schema
const guardianSchema = z.object({
  fatherName: z.string().nonempty('Father name is required'),
  fatherOccupation: z.string().nonempty('Father occupation is required'),
  fatherContactNo: z.string().nonempty('Father contact number is required'),
  motherName: z.string().nonempty('Mother name is required'),
  motherOccupation: z.string().nonempty('Mother occupation is required'),
  motherContactNo: z.string().nonempty('Mother contact number is required'),
});

// UserName Schema
const userNameSchema = z.object({
  firstName: z.string().nonempty('First name is required'),
  middleName: z.string().nonempty('Middle name is required'),
  lastName: z.string().nonempty('Last name is required'),
});

// LocalGuardian Schema
const localGuardianSchema = z.object({
  name: z.string().nonempty('Local guardian name is required'),
  contactNo: z.string().nonempty('Local guardian contact number is required'),
  occupation: z.string().nonempty('Local guardian occupation is required'),
  address: z.string().nonempty('Local guardian address is required'),
});

// Main Student Schema
const studentZodValidationSchema = z.object({
  id: z.string().nonempty('ID is required'),
  password : z.string(),
  name: userNameSchema,
  gender: z.enum(['male', 'female'], {
    errorMap: () => ({ message: 'Gender must be either "male" or "female"' }),
  }),
  dateOfBirth: z.string().nonempty('Date of birth is required'),
  contactNo: z.string().nonempty('Contact number is required'),
  emergencyContact: z.string().nonempty('Emergency contact number is required'),
  email: z
    .string()
    .email('Email must be a valid email address')
    .nonempty('Email is required'),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
    .optional(),
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImg: z.string().optional(), // Optional string for profile image
  isActive: z.enum(['active', 'blocked'], {
    errorMap: () => ({
      message: 'isActive must be either "active" or "blocked"',
    }),
  }),
  presentAddress: z.string().nonempty('Present address is required'),
  permanentAddress: z.string().nonempty('Permanent address is required'),
  isDeleted : z.boolean()
});

export default studentZodValidationSchema;
