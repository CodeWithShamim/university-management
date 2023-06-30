import express, { Router } from 'express';
import { StudentController } from './student.controller';
const router: Router = express.Router();

router.get('/:id', StudentController.getSingleStudent);
router.get('/', StudentController.getAllStudents);

// router.delete('/:id', StudentController.deleteStudent);

// router.patch(
//   '/:id',
//   validateRequest(StudentValidaion.updateStudentZodSchema),
//   StudentController.updateStudent
// );

export const StudentRoutes = router;
