import { Schema } from "mongoose";

export interface IUser {
  role: "student" | "admin" | "faculty";
  password: string;
  createdAt: Date;
  updatedAt: Date;
  userId: Schema.Types.ObjectId;
}
