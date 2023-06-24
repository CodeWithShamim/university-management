import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import calculatePagination from '../../../helpers/calculatePagination';
import {
  IPaginationOptions,
  IPaginationResponse,
} from '../../../interfaces/pagination';
import { academicSemesterTitleCodeMapper } from './academicSemester.constant';
import { IAcademicSemester } from './academicSemester.interface';
import AcademicSemester from './academicSemester.model';

const createAcademicSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code!');
  }
  const academicSemester = await AcademicSemester.create(payload);
  return academicSemester;
};

const getAllSemesters = async (
  paginationOptions: IPaginationOptions
): Promise<IPaginationResponse<IAcademicSemester[]>> => {
  const { page, limit, skip, sortCondition } =
    calculatePagination(paginationOptions);

  const semesters = await AcademicSemester.find({})
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    result: semesters,
  };
};

export const AcademicSemesterService = {
  createAcademicSemester,
  getAllSemesters,
};
