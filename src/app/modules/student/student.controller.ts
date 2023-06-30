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

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentService.getSingleStudent(id);

  sendReponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrieved successfully!',
    data: result,
  });
});

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentService.deleteStudent(id);

  sendReponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully!',
    data: result,
  });
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await StudentService.updateStudent(id, updatedData);

  sendReponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student updated successfully!',
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
