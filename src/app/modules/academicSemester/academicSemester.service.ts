import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IPaginationOptions } from '../../../interfaces/pagination';
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
): Promise<IAcademicSemester[]> => {
  const semesters = await AcademicSemester.find({ paginationOptions });
  return semesters;
};

export const AcademicSemesterService = {
  createAcademicSemester,
  getAllSemesters,
};
