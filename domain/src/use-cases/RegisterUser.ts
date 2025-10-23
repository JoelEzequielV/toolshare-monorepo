import { User } from '../entities/User';
import { InMemoryUserRepo } from '../services/InMemoryUserRepo';
import { randomUUID } from 'crypto';

export class RegisterUser {
  constructor(private repo: InMemoryUserRepo) {}

  async execute(name: string, email: string, password: string): Promise<User> {
    const existing = await this.repo.findByEmail(email);
    if (existing) throw new Error('Email already registered');

    const user = new User(randomUUID(), name, email, password);
    await this.repo.save(user);
    return user;
  }
}
