import { initAcademicSemesterEvents } from '../modules/academicSemester/academicSemester.event';

export const subscribeToEvents = async () => {
  await initAcademicSemesterEvents();
};
