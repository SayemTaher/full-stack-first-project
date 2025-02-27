"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModel = void 0;
const mongoose_1 = require("mongoose");
const userNameSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
        required: true,
    },
});
const studentGuardianSchema = new mongoose_1.Schema({
    fatherName: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    fatherContactNo: { type: String, required: true },
    motherName: { type: String, required: true },
    motherOccupation: { type: String, required: true },
    motherContactNo: { type: String, required: true },
});
const studentLocalGuardianSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    contactNo: { type: String, required: true },
    occupation: { type: String, required: true },
    address: { type: String, required: true },
});
const studentSchema = new mongoose_1.Schema({
    id: { type: String },
    name: userNameSchema,
    gender: ['male', 'female'],
    dateOfBirth: {
        type: String,
        required: true,
    },
    contactNo: { type: String, required: true },
    emergencyContact: { type: String, required: true },
    email: { type: String, required: true },
    bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    guardian: studentGuardianSchema,
    localGuardian: studentLocalGuardianSchema,
    profileImg: { type: String, required: true },
    isActive: ['active', 'blocked'],
    presentAdrress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
});
// create a model 
exports.StudentModel = (0, mongoose_1.model)('Student', studentSchema);
