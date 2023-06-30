import calculatePagination from '../../../helpers/calculatePagination';
import {
  IPaginationOptions,
  IPaginationResponse,
} from '../../../interfaces/pagination';
import { facultySearchableFields } from './faculty.constant';
import { IFaculty, IFacultyFilters } from './faculty.interface';
import Faculty from './faculty.model';

const getAllFaculties = async (
  filters: IFacultyFilters,
  paginationOptions: IPaginationOptions
): Promise<IPaginationResponse<IFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortCondition } =
    calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: facultySearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereConditions = andConditions.length ? { $and: andConditions } : {};

  const result = await Faculty.find(whereConditions)
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Faculty.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    result,
  };
};

const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const faculty = await Faculty.findById(id)
    .populate('academicDepartment')
    .populate('academicFaculty');
  return faculty;
};

const deleteFaculty = async (id: string): Promise<IFaculty | null> => {
  const faculty = await Faculty.findOneAndDelete({ _id: id })
    .populate('academicDepartment')
    .populate('academicFaculty');
  return faculty;
};

const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const faculty = await Faculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  })
    .populate('academicDepartment')
    .populate('academicFaculty');
  return faculty;
};

export const FacultyService = {
  getAllFaculties,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty,
};
