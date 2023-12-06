import { User } from "../entitys/User";
import { UserService } from "./UserService";

jest.mock('../repositores/UserRepository');

const mockUserRepository = require('../repositores/UserRepository');

describe('UserService', () => {
    const userService = new UserService(mockUserRepository);
    it('Deve adicionar um novo usuário', async () => {
        mockUserRepository.createUser = jest.fn();
        /* const user = new User('username', 'eu@gmail.com', 'password'); */
        await userService.createUser('username', 'eu@gmail.com', 'password');
        expect(mockUserRepository.createUser).toHaveBeenCalled()
    })
})
