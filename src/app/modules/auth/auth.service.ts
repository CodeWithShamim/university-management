import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import User from '../user/user.model';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  // check user exist
  const isUserExist = await User.isUserExist(id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist !');
  }

  // check password matched
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

  // create token
  const { id: userId, role, needPasswordChange } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { id: userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { id: userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  // validate refresh token
  let verifyToken = null;
  try {
    verifyToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token');
  }

  // check user exist
  const isUserExist = await User.isUserExist(verifyToken.id);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist!');
  }

  // create new access token
  const { id: userId, role } = isUserExist;
  const newAccessToken = jwtHelpers.createToken(
    { id: userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
