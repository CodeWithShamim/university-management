import express, { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
const router: Router = express.Router();

router.get('/', AcademicDepartmentController.getAllDepartments);
router.get('/:id', AcademicDepartmentController.getSingleDepartment);

router.post(
  '/',
  validateRequest(AcademicDepartmentValidation.createDepartmentZodSchema),
  AcademicDepartmentController.createAcademicDepartment
);

router.patch(
  '/:id',
  validateRequest(AcademicDepartmentValidation.updateDepartmentZodSchema),
  AcademicDepartmentController.updateDepartment
);

router.delete('/:id', AcademicDepartmentController.deleteDepartment);

export const AcademicDepartmentRoutes = router;
