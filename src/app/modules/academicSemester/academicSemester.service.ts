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

const getSingleSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const semester = await AcademicSemester.findById(id);
  return semester;
};

const updateSemester = async (
  id: string,
  payload: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code!');
  }

  const semester = await AcademicSemester.findOneAndUpdate(
    { syncId: id },
    payload,
    {
      new: true,
      runValidators: true,
    }
  );

  return semester;
};

const deleteSemester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const semester = await AcademicSemester.findOneAndDelete({ _id: id });
  return semester;
};

export const AcademicSemesterService = {
  createAcademicSemester,
  getAllSemesters,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
