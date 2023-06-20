import { Model } from 'mongoose';

export type IUser = {
  id: string;
  role: 'student' | 'admin' | 'faculty';
  password: string;
};

export type UserModel = Model<IUser, Record<string, unknown>>;
