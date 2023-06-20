import config from '../../../config';
import generateUserId from '../../../utils/generateUserId';
import { IUser } from './user.interface';
import User from './user.model';

const createUser = async (user: IUser): Promise<IUser> => {
  // generate user id
  const id = await generateUserId();
  user.id = id;

  // default role
  if (!user.role) {
    user.role = 'student';
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
