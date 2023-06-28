import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationsFields } from '../../../constants/pagination';
import catchAsync from '../../../utils/catchAsync';
import pick from '../../../utils/pick';
import sendReponse from '../../../utils/sendResponse';
import { studentFilterableFields } from './student.constant';
import { IStudent } from './student.interface';
import { StudentService } from './student.service';

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, studentFilterableFields);
  const paginationOptions = pick(req.query, paginationsFields);

  const result = await StudentService.getAllStudents(
    filters,
    paginationOptions
  );

  sendReponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students retrieved successfully!',
    meta: result.meta,
    data: result.result,
  });
});

export const StudentController = {
  getAllStudents,
};
