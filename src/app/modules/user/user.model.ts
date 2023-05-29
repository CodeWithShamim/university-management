import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>({
  id: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
  userType: {
    type: String,
    enum: ["studentId", "adminId", "facultyId"],
    required: true,
  },
});

const User = model<IUser>("User", userSchema);
export default User;
