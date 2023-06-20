import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['student', 'admin', 'faculty'],
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = model<IUser>('User', userSchema);
export default User;
