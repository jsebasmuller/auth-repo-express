import { Router } from 'express';
import { UserController } from './UserController';

const controller = new UserController();

const UserRouter = Router();

UserRouter.post('/register', controller.create);
UserRouter.post('/login', controller.login);

export { UserRouter };