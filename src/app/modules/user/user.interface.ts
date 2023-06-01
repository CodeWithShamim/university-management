import { Schema } from 'mongoose'

export type IUser = {
  role: 'student' | 'admin' | 'faculty'
  password: string
  userId: Schema.Types.ObjectId
}
