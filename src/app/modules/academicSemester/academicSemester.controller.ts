import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationsFields } from '../../../constants/pagination';
import catchAsync from '../../../utils/catchAsync';
import pick from '../../../utils/pick';
import sendReponse from '../../../utils/sendResponse';
import { academicSemesterFilterableFields } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemesterService } from './academicSemester.service';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await AcademicSemesterService.createAcademicSemester(data);

    sendReponse<IAcademicSemester>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic semester created successfully!',
      data: result,
    });
  }
);

const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationsFields);
  const filters = pick(req.query, academicSemesterFilterableFields);

  const result = await AcademicSemesterService.getAllSemesters(
    paginationOptions,
    filters
  );

  sendReponse<IAcademicSemester[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic semesters retrieved successfully!',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleSemester = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicSemesterService.getSingleSemester(id);

  sendReponse<IAcademicSemester>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic semester retrieved successfully!',
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllSemesters,
  getSingleSemester,
};
