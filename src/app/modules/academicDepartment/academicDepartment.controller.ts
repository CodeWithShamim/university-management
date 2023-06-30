import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationsFields } from '../../../constants/pagination';
import catchAsync from '../../../utils/catchAsync';
import pick from '../../../utils/pick';
import sendResponse from '../../../utils/sendResponse';
import { academicDepartmentFilterableFields } from './academicDepartment.constant';
import { IAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartmentService } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const data = req.body;
    const result = await AcademicDepartmentService.createAcademicDepartment(
      data
    );

    sendResponse<IAcademicDepartment>(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Department created successfully!',
      data: result,
    });
  }
);

const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationsFields);
  const filters = pick(req.query, academicDepartmentFilterableFields);

  const result = await AcademicDepartmentService.getAllDepartments(
    paginationOptions,
    filters
  );

  sendResponse<IAcademicDepartment[]>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Departments retrieved successfully!',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicDepartmentService.getSingleDepartment(id);

  sendResponse<IAcademicDepartment>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Department retrieved successfully!',
    data: result,
  });
});

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await AcademicDepartmentService.updateDepartment(
    id,
    updatedData
  );

  sendResponse<IAcademicDepartment>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Department updated successfully!',
    data: result,
  });
});

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicDepartmentService.deleteDepartment(id);

  sendResponse<IAcademicDepartment>(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Department deleted successfully!',
    data: result,
  });
});

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
