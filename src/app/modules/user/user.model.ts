import { Schema, model } from 'mongoose'
import { IUser } from './user.interface'

const userSchema = new Schema<IUser>({
  role: {
    type: String,
    enum: ['student', 'admin', 'faculty'],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
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
})

const User = model<IUser>('User', userSchema)
export default User
