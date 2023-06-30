import express from 'express';
const router = express.Router();

import validateRequest from '../../middlewares/validateRequest';
import { ManagementDepartmentController } from './managementDepartment.controller';
import { ManagementDepartmentValidation } from './managementDepartment.validation';

router.get('/:id', ManagementDepartmentController.getSingleDepartment);
router.get('/', ManagementDepartmentController.getAllDepartments);

router.post(
  '/',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.createDepartment
);

router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.updateDepartment
);

router.delete('/:id', ManagementDepartmentController.deleteDepartment);

export const ManagementDepartmentRoutes = router;
