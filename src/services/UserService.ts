import { AppDataSource } from "../database";
import { User } from "../entitys/User";
import { UserRepository } from "../repositores/UserRepository";
import { sign } from 'jsonwebtoken'

interface Tuser {
    user_id: string;
    name: string,
    password: string,
    email: string
}


export class UserService {
    private userRepository: UserRepository;

    constructor(userRepository = new UserRepository(AppDataSource.manager)) {
        this.userRepository = userRepository;
    };

    createUser = async (name: string, email: string, password: string) => {
        const user = new User(name, email, password);
        return await this.userRepository.createUser(user);
    }

    getUser = async (id: string) => {
        return this.userRepository.getUser(id);
    }

    getUsers = async () => {
        return this.userRepository.getAllUsers();
    }

    getUserByLogin = async (name: string, password: string): Promise<string | null> => {

        try {
            const result = await this.userRepository.getLogin(name, password);
            

            const tokenData = {
                name: result?.name,
                email: result?.email
            }

            const tokenKey = 'token'
            const tokenOptions = {
                subject: result?.id_user
            }

            const token = sign(tokenData, tokenKey, tokenOptions)
            

            return token
        } catch (error) {
            return null
        }
    }

    deleteUser = async (id: string): Promise<string> => {
        return await this.userRepository.deleteUser(id)
    }
}

