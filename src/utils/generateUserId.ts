import User from '../app/modules/user/user.model';

const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastUser?.id;
};

const generateUserId = async () => {
  const currentId = (await findLastUserId()) || String(0).padStart(5, '0');

  //increment by 1
  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  return incrementedId;
};

export default generateUserId;
