import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendReponse from '../../../utils/sendResponse';
import { AcademicSemesterService } from './academicSemester.service';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await AcademicSemesterService.createAcademicSemester(data);

    sendReponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic semester created successfully!',
      data: result,
    });
  }
);

export const AcademicSemesterController = {
  createAcademicSemester,
};
