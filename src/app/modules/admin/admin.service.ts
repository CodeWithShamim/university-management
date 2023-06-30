import calculatePagination from '../../../helpers/calculatePagination';
import {
  IPaginationOptions,
  IPaginationResponse,
} from '../../../interfaces/pagination';
import { adminSearchableFields } from './admin.constant';
import { IAdmin, IAdminFilters } from './admin.interface';
import Admin from './admin.model';

const getAllAdmins = async (
  filters: IAdminFilters,
  paginationOptions: IPaginationOptions
): Promise<IPaginationResponse<IAdmin[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortCondition } =
    calculatePagination(paginationOptions);

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: adminSearchableFields.map(field => ({
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

  const result = await Admin.find(whereConditions)
    .populate('managementDepartment')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Admin.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    result,
  };
};

const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
  const admin = await Admin.findById(id).populate('managementDepartment');
  return admin;
};

const deleteAdmin = async (id: string): Promise<IAdmin | null> => {
  const admin = await Admin.findOneAndDelete({ _id: id }).populate(
    'managementDepartment'
  );
  return admin;
};

const updateAdmin = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  const admin = await Admin.findOneAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  }).populate('managementDepartment');
  return admin;
};

export const AdminService = {
  getAllAdmins,
  getSingleAdmin,
  deleteAdmin,
  updateAdmin,
};
