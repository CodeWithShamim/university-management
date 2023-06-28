import httpStatus from 'http-status';
import mongoose from 'mongoose';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import generateUserId from '../../../utils/generateUserId';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { IStudent } from '../student/student.interface';
import Student from '../student/student.model';
import { IUser } from './user.interface';
import User from './user.model';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // default password
  if (!user.password) {
    user.password = config.default_student_pass as string;
  }

  // set role
  user.role = 'student';

  // generate user id
  const academicSemester = (await AcademicSemester.findById(
    student.academicSemester
  ).lean()) as IAcademicSemester;

  if (!academicSemester) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Failed to find academic semester'
    );
  }

  let newUserAllData = null;
  const seassion = await mongoose.startSession();
  try {
    seassion.startTransaction();

    // step-1
    const id = await generateUserId(user.role, academicSemester);
    if (!id) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student id');
    }

    user.id = id;
    student.id = id;

    // step-2
    const newStudent = await Student.create([student], { seassion });
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    // console.log(newStudent, 'newStudent');

    // set student _id into user.student
    user.student = newStudent[0]._id;

    // step-3
    const newUser = await User.create([user], { seassion });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    newUserAllData = newUser[0];

    seassion.commitTransaction();
    seassion.endSession();
  } catch (error) {
    seassion.abortTransaction();
    seassion.endSession();
    throw error;
  }

  return newUserAllData;
};

const createFaculty = async (user: IUser): Promise<IUser> => {
  user.role = 'faculty';

  // generate user id
  const academicSemester = (await AcademicSemester.findOne({
    code: '01',
  })) as IAcademicSemester;
  const id = await generateUserId(user.role, academicSemester);
  if (id) {
    user.id = id;
  }

  // default password
  if (!user.password) {
    user.password = config.default_faculty_pass as string;
  }

  const newUser = await User.create(user);
  return newUser;
};

const createAdmin = async (user: IUser): Promise<IUser> => {
  user.role = 'admin';

  // generate user id
  const academicSemester = (await AcademicSemester.findOne({
    code: '01',
  })) as IAcademicSemester;
  const id = await generateUserId(user.role, academicSemester);
  if (id) {
    user.id = id;
  }

  // default password
  if (!user.password) {
    user.password = config.default_admin_pass as string;
  }

  const newUser = await User.create(user);
  return newUser;
};

export const UserService = {
  createStudent,
  createFaculty,
  createAdmin,
};
