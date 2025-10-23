import { User } from '../entities/User';

export class InMemoryUserRepo {
  private users: User[] = [];

  async save(user: User): Promise<void> {
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(u => u.email === email);
  }

  async getAll(): Promise<User[]> {
    return this.users;
  }
}
