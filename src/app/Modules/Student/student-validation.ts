import Joi from 'joi';

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(10)
    .regex(/^[A-Z][a-z]*$/)
    .required()
    .messages({
      'string.max': 'First name must be at most 10 characters',
      'string.pattern.base': '{#value} is not in the Capitalized format',
      'string.empty': 'First name is required',
    }),
  lastName: Joi.string()
    .trim()
    .regex(/^[A-Za-z]+$/)
    .required()
    .messages({
      'string.pattern.base': '{#value} is not valid',
      'string.empty': 'Last name is required',
    }),
  middleName: Joi.string().trim().required().messages({
    'string.empty': 'Middle name is required',
  }),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().messages({
    'string.empty': 'Father name is required',
  }),
  fatherOccupation: Joi.string().required().messages({
    'string.empty': 'Father occupation is required',
  }),
  fatherContactNo: Joi.string().required().messages({
    'string.empty': 'Father contact number is required',
  }),
  motherName: Joi.string().required().messages({
    'string.empty': 'Mother name is required',
  }),
  motherOccupation: Joi.string().required().messages({
    'string.empty': 'Mother occupation is required',
  }),
  motherContactNo: Joi.string().required().messages({
    'string.empty': 'Mother contact number is required',
  }),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().trim().max(20).required().messages({
    'string.max': 'Name cannot exceed 20 characters',
    'string.empty': 'Local guardian name is required',
  }),
  contactNo: Joi.string().required().messages({
    'string.empty': 'Local guardian contact number is required',
  }),
  occupation: Joi.string().required().messages({
    'string.empty': 'Local guardian occupation is required',
  }),
  address: Joi.string().required().messages({
    'string.empty': 'Local guardian address is required',
  }),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.empty': 'ID is required',
  }),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female').required().messages({
    'any.only': '{#value} is not valid',
    'string.empty': 'Gender is required',
  }),
  dateOfBirth: Joi.string().isoDate().messages({
    'string.isoDate': 'Date of birth must be a valid ISO date',
  }),
  contactNo: Joi.string().required().messages({
    'string.empty': 'Contact number is required',
  }),
  emergencyContact: Joi.string().required().messages({
    'string.empty': 'Emergency contact number is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': '{#value} is not a valid email',
    'string.empty': 'Email is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .messages({
      'any.only': '{#value} is not a valid blood group',
    }),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: Joi.string().uri().messages({
    'string.uri': 'Profile image must be a valid URI',
  }),
  isActive: Joi.string().valid('active', 'blocked').default('active').messages({
    'any.only': '{#value} is not valid for isActive',
  }),
  presentAddress: Joi.string().messages({
    'string.empty': 'Present address is required',
  }),
  permanentAddress: Joi.string().messages({
    'string.empty': 'Permanent address is required',
  }),
});

export default studentValidationSchema