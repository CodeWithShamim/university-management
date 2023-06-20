export type IUser = {
  id: string;
  role: 'student' | 'admin' | 'faculty';
  password: string;
};
