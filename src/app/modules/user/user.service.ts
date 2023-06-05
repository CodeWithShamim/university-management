import config from '../../../config'
import generateUserId from '../../../utils/generateUserId'
import { IUser } from './user.interface'
import User from './user.model'

const createUserToDB = async (user: IUser): Promise<IUser | null> => {
  const userData = await User.create(user)

  // auto generated incremental id
  const id = await generateUserId()
  console.log(id)
  user.id = id

  // default password
  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  if (!userData) {
    throw new Error('Failed to create user!')
  }
  return userData
}

export { createUserToDB }
