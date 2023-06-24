import { SortOrder } from 'mongoose';
import {
  IPaginationCalculateResponse,
  IPaginationOptions,
} from '../interfaces/pagination';

const calculatePagination = (
  options: IPaginationOptions
): IPaginationCalculateResponse => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;
  const skip = (page - 1) * limit;

  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  return {
    page,
    limit,
    skip,
    sortCondition,
  };
};

export default calculatePagination;
