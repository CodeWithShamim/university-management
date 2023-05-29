export interface IUser {
  id: string;
  role: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  userType: "studentId" | "adminId" | "facultyId";
}
