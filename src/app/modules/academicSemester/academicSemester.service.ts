import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import calculatePagination from '../../../helpers/calculatePagination';
import {
  IPaginationOptions,
  IPaginationResponse,
} from '../../../interfaces/pagination';
import {
  academicSemesterSearchableFields,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constant';
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface';
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
  paginationOptions: IPaginationOptions,
  filters: Partial<IAcademicSemesterFilters>
): Promise<IPaginationResponse<IAcademicSemester[]>> => {
  // pagination
  const { page, limit, skip, sortCondition } =
    calculatePagination(paginationOptions);

  // search & filters
  const andConditions = [];
  const { searchTerm, ...filtersData } = filters;

  // search
  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchableFields.map(field => {
        return {
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        };
      }),
    });
  }

  // filters
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions = andConditions.length ? { $and: andConditions } : {};

  const semesters = await AcademicSemester.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemester.countDocuments(whereConditions);

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
