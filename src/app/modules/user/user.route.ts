import express, { Router } from 'express';
const router: Router = express.Router();
import userController from './user.controller';

router.post('/create-user', userController.createUser);

export default router;
