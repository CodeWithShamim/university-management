import { RedisClient } from '../../../utils/redis';
import {
  EVENT_ACADEMIC_SEMESTER_CREATED,
  EVENT_ACADEMIC_SEMESTER_UPDATED,
} from './academicSemester.constant';
import { AcademicSemesterService } from './academicSemester.service';

export const initAcademicSemesterEvents = async () => {
  // subscribe for create
  RedisClient.subscribe(EVENT_ACADEMIC_SEMESTER_CREATED, async v => {
    const data = JSON.parse(v);
    if (data) {
      await AcademicSemesterService.createAcademicSemester({
        ...data,
        syncId: data?.id,
      });
    }
  });

  // subscribe for update
  RedisClient.subscribe(EVENT_ACADEMIC_SEMESTER_UPDATED, async v => {
    const data = JSON.parse(v);
    if (data) {
      await AcademicSemesterService.updateSemester(data?.id, data);
    }
  });
};
