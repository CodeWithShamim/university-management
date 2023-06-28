import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendReponse from '../../../utils/sendResponse';
import { IUser } from './user.interface';
import { UserService } from './user.service';

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { student, ...userData } = req.body;
  const result = await UserService.createStudent(student, userData);

  sendReponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student created successfully !',
    data: result,
  });
});

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  const result = await UserService.createFaculty(user);

  sendReponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Faculty created successfully !',
    data: result,
  });
});

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  const result = await UserService.createAdmin(user);

  sendReponse<IUser>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Admin created successfully !',
    data: result,
  });
});

export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
};
