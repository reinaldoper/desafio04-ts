import { User } from './../entitys/User';
import { EntityManager, DeleteResult } from "typeorm";
/* import { AppDataSource } from "../database";
import { User } from "../entitys/User"; */

export class UserRepository {
  private manager: EntityManager

  constructor(manager: EntityManager){
    this.manager = manager;
  }

  createUser = async (user: User): Promise<User> => {
    return this.manager.save(user);
  }

  getUser = async (id: string): Promise<User | null>=> {
    return await this.manager.findOne(User, 
      {
        where: {
          id_user: id,
        }
      });
  }

  getAllUsers = async (): Promise<User[]> => {
    const users = await this.manager.find(User,{
      select: ["id_user", "name", "email"],
      order: {
        name: 'ASC',
      },
    });

    return users 
  }

  getLogin = async (name: string, password: string): Promise<User | null> => {
    const user = await this.manager.findOne(User,{
      select: ["id_user", "name", "email"],
      where: {
        name: name,
        password: password
      }
    });
    return user
  }

  deleteUser = async (id: string): Promise<string> => {
    const deleteResult: DeleteResult = await this.manager.delete(User, {
      where: {
        id_user: id
      }
    });
  
    if (deleteResult.affected && deleteResult.affected > 0) {
      return 'User deleted successfully'
    } else {
      return 'User not found'
    }
  };
}