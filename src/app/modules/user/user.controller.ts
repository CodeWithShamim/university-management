import { Request, Response } from 'express';
import catchAsync from '../../../utils/catchAsync';
import { UserService } from './user.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  const result = await UserService.createUser(user);

  res.status(200).json({
    success: true,
    message: 'New user create success.',
    data: result,
  });
});

export const UserController = {
  createUser,
};
