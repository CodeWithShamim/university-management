import config from '../../../config';
import generateUserId from '../../../utils/generateUserId';
import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { IUser } from './user.interface';
import User from './user.model';

const createUser = async (user: IUser): Promise<IUser> => {
  if (!user.role) {
    user.role = 'student';
  }

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
  createUser,
};
