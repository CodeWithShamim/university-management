import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationsFields } from '../../../constants/pagination';
import catchAsync from '../../../utils/catchAsync';
import pick from '../../../utils/pick';
import sendReponse from '../../../utils/sendResponse';
import { academicFacultyFilterableFields } from './academicFaculty.constant';
import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicFacultyService } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await AcademicFacultyService.createAcademicFaculty(data);

    sendReponse<IAcademicFaculty>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Faculty created successfully!',
      data: result,
    });
  }
);

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationsFields);
  const filters = pick(req.query, academicFacultyFilterableFields);

  const result = await AcademicFacultyService.getAllFaculties(
    paginationOptions,
    filters
  );

  sendReponse<IAcademicFaculty[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Faculties retrieved successfully!',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicFacultyService.getSingleFaculty(id);

  sendReponse<IAcademicFaculty>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Faculty retrieved successfully!',
    data: result,
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await AcademicFacultyService.updateFaculty(id, updatedData);

  sendReponse<IAcademicFaculty>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Faculty updated successfully!',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicFacultyService.deleteFaculty(id);

  sendReponse<IAcademicFaculty>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Faculty deleted successfully!',
    data: result,
  });
});

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
