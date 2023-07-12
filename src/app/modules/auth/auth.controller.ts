import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { ILoginUserResponse } from './auth.interface';
import { AuthService } from './auth.service';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const loginData = req.body;
  const result = await AuthService.loginUser(loginData);
  const { refreshToken, ...others } = result;

  // set refresh token into browser cookie
  const cookieOptions = {
    secure: config.node_env === 'production',
    httpOnly: true,
  };
  req.cookies('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User login successfully !',
    data: others,
  });
});

export const AuthController = {
  loginUser,
};
