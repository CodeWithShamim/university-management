import config from '../../../config';
import generateUserId from '../../../utils/generateUserId';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { IUser } from './user.interface';
import User from './user.model';

const createStudent = async (user: IUser): Promise<IUser> => {
  user.role = 'student';

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
    user.password = config.default_user_pass as string;
  }

  const newUser = await User.create(user);
  return newUser;
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
    user.password = config.default_user_pass as string;
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
    user.password = config.default_user_pass as string;
  }

  const newUser = await User.create(user);
  return newUser;
};

export const UserService = {
  createStudent,
  createFaculty,
  createAdmin,
};
