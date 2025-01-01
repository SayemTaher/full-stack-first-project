import { Request, Response } from 'express';
import { StudentServices } from './student-service';

// import studentValidationSchema from './student-validation'
import studentZodValidationSchema from './student-validation-zod';

const createStudent = async (req: Request, res: Response) => {
  try {

    // send response
    const studentData = req.body.student;
    // validate using joi
    // const { value, error } = studentValidationSchema.validate(studentData)
    // console.log(value, error)
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'something went wrong',
    //     error: error.details,
    //   });
    // }
    // validate using zod
    // const zodValidationData = studentZodValidationSchema.safeParse(studentData)
    
    // // will call service func to process this data
    // const result = await StudentServices.createStudentIntoDB(zodValidationData);
    const zodValidationData = studentZodValidationSchema.safeParse(studentData);

    if (zodValidationData.success) {
      // Extract the validated data
      const validatedData = zodValidationData.data;

      // Call the service function with the validated data
      const result = await StudentServices.createStudentIntoDB(validatedData);

      console.log('Student created successfully:', result);
    } else {
      // Handle validation errors
      console.error('Validation failed:', zodValidationData.error.errors);
      throw new Error('Student data validation failed'); // Optional, depending on your error-handling strategy
    }

    //  send response
    res.status(200).json({
      success: true,
      message: 'Student is created successfully!!',
      data : zodValidationData
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      data: err,
    });
  }
};
const getAllStudents = async (req: Request, res: Response) => {
  try {
    // send response

    // will call service func to process this data
    const result = await StudentServices.getAllStudentsFromDB();
    //  send response
    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully!!',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
// single student
const getAStudent = async (req: Request, res: Response) => {
  try {
    // send response
    const studentId = req.params.studentId;
    // will call service func to process this data
    const result = await StudentServices.getAStudentsFromDB(studentId);
    //  send response
    res.status(200).json({
      success: true,
      message: 'Student is retrieved successfully!!',
      data: result,
    });
  } catch (err: any) {
    
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error : err
    })
    console.log(err);
  }
};
const deleteAStudent = async (req: Request, res: Response) => {
  try {
    // send response
    const studentId = req.params.studentId;
    // will call service func to process this data
    const result = await StudentServices.deleteAStudentsFromDB(studentId);
    //  send response
    res.status(200).json({
      success: true,
      message: 'Student is removed  successfully!!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
    console.log(err);
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getAStudent,
  deleteAStudent
};
