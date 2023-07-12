import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import User from '../user/user.model';
import { ILoginUser, ILoginUserResponse } from './auth.interface';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  const isUserExist = await User.isUserExist(id);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist !');
  }

  const isPasswordMatched = await User.isPasswordMatched(
    password,
    isUserExist.password
  );

  if (!isPasswordMatched) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'User id or password is wrong !'
    );
  }

  //   const { id: userId, role, needPasswordChange } = isUserExist;

  return {
    accessToken: 'aaaaa',
    refreshToken: 'rrrrr',
    needPasswordChange: true,
  };
};

export const AuthService = {
  loginUser,
};
