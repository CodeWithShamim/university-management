import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendReponse from '../../../utils/sendResponse';
import { IUser } from './user.interface';
import { UserService } from './user.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  const result = await UserService.createUser(user);

  sendReponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User created successfully !',
    data: result,
  });
});

export const UserController = {
  createUser,
};
