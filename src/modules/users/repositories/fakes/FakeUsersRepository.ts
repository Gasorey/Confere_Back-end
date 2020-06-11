import User from '@modules/users/infra/typeorm/entities/User';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUsersDTO';
import { uuid } from 'uuidv4';
import IUsersRepository from '../IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async create(data: ICreateUsersDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid(), ...data });

    this.users.push(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);

    return findUser;
  }
}

export default FakeUsersRepository;
