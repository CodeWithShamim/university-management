import User from '../app/modules/user/user.model'

const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean()

  return lastUser?.id
}

const generateUserId = async () => {
  return (await findLastUserId()) || String(0).padStart(5, '0')
}

export default generateUserId
