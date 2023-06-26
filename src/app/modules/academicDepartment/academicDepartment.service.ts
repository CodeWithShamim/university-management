import calculatePagination from '../../../helpers/calculatePagination';
import {
  IPaginationOptions,
  IPaginationResponse,
} from '../../../interfaces/pagination';
import { academicDepartmentSearchableFields } from './academicDepartment.constant';
import {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from './academicDepartment.interface';
import AcademicDepartment from './academicDepartment.model';

const createAcademicDepartment = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment> => {
  const academicDepartment = (
    await AcademicDepartment.create(payload)
  ).populate('academicFaculty');
  return academicDepartment;
};

const getAllDepartments = async (
  paginationOptions: IPaginationOptions,
  filters: Partial<IAcademicDepartmentFilters>
): Promise<IPaginationResponse<IAcademicDepartment[]>> => {
  // pagination
  const { page, limit, skip, sortCondition } =
    calculatePagination(paginationOptions);

  // search & filters
  const andConditions = [];
  const { searchTerm, ...filtersData } = filters;

  // search
  if (searchTerm) {
    andConditions.push({
      $or: academicDepartmentSearchableFields.map(field => {
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

  const Departments = await AcademicDepartment.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
    .populate('academicFaculty');

  const total = await AcademicDepartment.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    result: Departments,
  };
};

const getSingleDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const Department = await AcademicDepartment.findById(id).populate(
    'academicFaculty'
  );
  return Department;
};

const updateDepartment = async (
  id: string,
  payload: Partial<IAcademicDepartment>
): Promise<IAcademicDepartment | null> => {
  const Department = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
      runValidators: true,
    }
  ).populate('academicFaculty');
  return Department;
};

const deleteDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const Department = await AcademicDepartment.findOneAndDelete({
    _id: id,
  }).populate('academicFaculty');
  return Department;
};

export const AcademicDepartmentService = {
  createAcademicDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
