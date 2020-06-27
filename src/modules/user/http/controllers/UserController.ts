import { Request, Response } from 'express';

import IListUsersDTO from '@modules/user/dtos/IListUsersDTO';
import IEditUserDTO from '@modules/user/dtos/IEditUserDTO';

import CreateUserService from '@modules/user/services/CreateUserService';
import ListUsersService from '@modules/user/services/ListUsersService';
import ViewUserService from '@modules/user/services/ViewUserService';
import EditUserService from '@modules/user/services/EditUserService';

class UsersController {
    public async create(
        request: Request,
        response: Response
    ): Promise<Response> {
        const { name, age, phone, email, password, role } = request.body;

        const user = await CreateUserService({
            name,
            age,
            phone,
            email,
            password,
            role
        });

        return response.json(user);
    }

    public async index(
        request: Request,
        response: Response
    ): Promise<Response> {
        const q = request.query;
        const { name, age, phone, email, role, page = 1, limit = 5 } = q;

        const filters = <IListUsersDTO>{
            name,
            age,
            phone,
            email,
            role,
            page,
            limit
        };

        const users = await ListUsersService(filters);

        return response.json(users);
    }

    public async view(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const user = await ViewUserService(id);

        return response.json(user);
    }

    public async edit(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { name, age, phone, email } = request.body;

        const userData = {
            id,
            name,
            age,
            phone,
            email
        } as IEditUserDTO;

        const user = await EditUserService(userData);

        return response.json(user);
    }
}

export default new UsersController();
