import { Model, Types } from 'mongoose';

export type IUser = {
  id: string;
  role: 'student' | 'admin' | 'faculty';
  password: string;
  needPasswordChange: boolean;
  student?: Types.ObjectId;
  faculty?: Types.ObjectId;
  admin?: Types.ObjectId;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
