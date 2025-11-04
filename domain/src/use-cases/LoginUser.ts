import { IUserRepository } from '../repositories/IUserRepository';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../entities/User';

export class LoginUser {
  constructor(private userRepo: IUserRepository) {}

  async execute(email: string, password: string): Promise<{ user: User; token: string }> {
    const user = await this.userRepo.findByEmail(email);
    if (!user) throw new Error('User not found');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Invalid password');

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      'SUPER_SECRET_KEY',
      { expiresIn: '1h' }
    );

    return { user, token };
  }
}
