import { IAcademicSemester } from './academicSemester.interface';
import AcademicSemester from './academicSemester.model';

const createAcademicSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  const academicSemester = await AcademicSemester.create(payload);
  return academicSemester;
};

export const AcademicSemesterService = {
  createAcademicSemester,
};
