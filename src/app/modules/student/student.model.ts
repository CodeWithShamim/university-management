import mongoose, { Schema } from 'mongoose';
import { IStudent } from './student.interface';

const studentSchema = new Schema<IStudent>({
  name: {
    firstName: {
      type: String,
      required: true,
    },
    middleName: String,
    lastName: {
      type: String,
      required: true,
    },
  },
  gender: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  guardian: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  emergencyContactNo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  presentAddress: {
    type: String,
    required: true,
  },
  permanentAddress: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
});

const Student = mongoose.model<IStudent>('Student', studentSchema);

export default Student;
