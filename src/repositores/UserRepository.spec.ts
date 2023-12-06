import { EntityManager } from "typeorm";
import { getMockEntityManager } from "../__mocks__/mockEntityManager.mock";
import { User } from "../entitys/User";
import { UserRepository } from "./UserRepository";

describe('UserRepository', () => {
  let userRepository: UserRepository;
  let managerMock: EntityManager

  const mockUser: User = {
    id_user: '123',
    name: 'John',
    email: 'john@example.com',
    password: 'password'
  }

  beforeAll(async () => {
    managerMock = await getMockEntityManager({
      saveReturn: mockUser
    })
    userRepository = new UserRepository(managerMock);
  });

  it('should create User', async () => {
    const response = await userRepository.createUser(mockUser);
    expect(managerMock.save).toHaveBeenCalled();
    expect(response).toMatchObject(mockUser);
  })
})