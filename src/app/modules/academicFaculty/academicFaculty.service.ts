import calculatePagination from '../../../helpers/calculatePagination';
import {
  IPaginationOptions,
  IPaginationResponse,
} from '../../../interfaces/pagination';
import { academicFacultySearchableFields } from './academicFaculty.constant';
import {
  IAcademicFaculty,
  IAcademicFacultyFilters,
} from './academicFaculty.interface';
import AcademicFaculty from './academicFaculty.model';

const createAcademicFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  const academicFaculty = await AcademicFaculty.create(payload);
  return academicFaculty;
};

const getAllFaculties = async (
  paginationOptions: IPaginationOptions,
  filters: Partial<IAcademicFacultyFilters>
): Promise<IPaginationResponse<IAcademicFaculty[]>> => {
  // pagination
  const { page, limit, skip, sortCondition } =
    calculatePagination(paginationOptions);

  // search & filters
  const andConditions = [];
  const { searchTerm, ...filtersData } = filters;

  // search
  if (searchTerm) {
    andConditions.push({
      $or: academicFacultySearchableFields.map(field => {
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

  const faculties = await AcademicFaculty.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await AcademicFaculty.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    result: faculties,
  };
};

const getSingleFaculty = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const Faculty = await AcademicFaculty.findById(id);
  return Faculty;
};

const updateFaculty = async (
  id: string,
  payload: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
  const Faculty = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  });
  return Faculty;
};

const deleteFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
  const Faculty = await AcademicFaculty.findOneAndDelete({ _id: id });
  return Faculty;
};

export const AcademicFacultyService = {
  createAcademicFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
