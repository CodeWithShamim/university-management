import { SortOrder } from 'mongoose';

export type IPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

export type IPaginationResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  result: T;
};

export type IPaginationCalculateResponse = {
  page: number;
  limit: number;
  skip: number;
  sortCondition: { [key: string]: SortOrder };
};
