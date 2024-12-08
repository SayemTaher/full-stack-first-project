import express from 'express'
import { StudentController } from './student-controller'

const router = express.Router()

// will call controller function from the controler file

router.post('/create-student' , StudentController.createStudent )