import { User } from '../entities/User';
import { IUserRepository } from '../repositories/IUserRepository';
import { randomUUID } from 'crypto';
import bcrypt from 'bcryptjs';


export class RegisterUser {
  constructor(private userRepo: IUserRepository) {}

  async execute(name: string, email: string, password: string): Promise<User> {
    const existing = await this.userRepo.findByEmail(email);
    if (existing) throw new Error('Email already registered');

    // Hash de contraseña seguro
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User(randomUUID(), name, email, hashedPassword);
    await this.userRepo.save(user);
    return user;
  }
}
