import { Request, Response } from "express";
import { StudentServices } from "./student-service";

const createStudent = async(req: Request, res: Response) => {
    try {
      // send response
      const studentData = req.body;
      // will call service func to process this data
      const result = await StudentServices.createStudentIntoDB(studentData);
      //  send response
      res.status(200).json({
        success: true,
        message: 'Student is created successfully!!',
        data: result,
      });
    } catch (err) {
        console.log(err)
   }
}

export const StudentController = {
    createStudent
}