import Router from 'express';
import asyncHandler from 'express-async-handler';

import { Role as UserRole } from '@modules/user/schema/UserSchema';
import UserController from '../controllers/UserController';
import {
    isAuthenticated,
    isAcceptableRole,
    isOwnUserOrAdmin
} from '@middleware/auth';

import {
    CreateUserValidator,
    PaginateUserValidatior,
    EditUserValidator
} from './validator/user';

const routes = Router();

routes.post('', [CreateUserValidator], UserController.create);

routes.use(asyncHandler(isAuthenticated));

routes.get(
    '',
    [isAcceptableRole(UserRole.ADMIN), PaginateUserValidatior],
    UserController.index
);

routes.get('/:id', [isOwnUserOrAdmin], UserController.view);

routes.put('/:id', [isOwnUserOrAdmin, EditUserValidator], UserController.edit);

routes.delete('/:id', [isOwnUserOrAdmin], UserController.delete);

export default routes;
