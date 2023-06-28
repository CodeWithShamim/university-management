import { IAcademicSemester } from '../app/modules/academicSemester/academicSemester.interface';
import User from '../app/modules/user/user.model';

type UserRole = 'student' | 'faculty' | 'admin';

const findLastUserId = async (role: UserRole): Promise<string | undefined> => {
  const lastUser = await User.findOne({ role }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();

  if (role === 'student') {
    return lastUser?.id ? lastUser.id.substring(4) : undefined;
  } else {
    return lastUser?.id ? lastUser.id.substring(2) : undefined;
  }
};

const generateUserId = async (
  role: UserRole,
  academicSemester: IAcademicSemester
): Promise<string | undefined> => {
  const currentId = (await findLastUserId(role)) || String(0).padStart(5, '0');

  //increment by 1
  let incrementedId;

  if (role === 'student') {
    incrementedId = `${academicSemester?.year?.substring(2)}${
      academicSemester?.code
    }${(parseInt(currentId) + 1).toString().padStart(5, '0')}`;
  } else if (role === 'faculty') {
    incrementedId = `F-${(parseInt(currentId) + 1)
      .toString()
      .padStart(5, '0')}`;
  } else if (role === 'admin') {
    incrementedId = `A-${(parseInt(currentId) + 1)
      .toString()
      .padStart(5, '0')}`;
  }

  return incrementedId;
};

export default generateUserId;
