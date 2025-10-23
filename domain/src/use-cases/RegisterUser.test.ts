import { InMemoryUserRepo } from '../services/InMemoryUserRepo';
import { RegisterUser } from './RegisterUser';

describe('RegisterUser', () => {
  it('should register a new user', async () => {
    const repo = new InMemoryUserRepo();
    const registerUser = new RegisterUser(repo);

    const user = await registerUser.execute('Juan', 'juan@example.com', '1234');

    expect(user.email).toBe('juan@example.com');
    expect((await repo.getAll()).length).toBe(1);
  });

  it('should not allow duplicate emails', async () => {
    const repo = new InMemoryUserRepo();
    const registerUser = new RegisterUser(repo);

    await registerUser.execute('Juan', 'juan@example.com', '1234');
    await expect(
      registerUser.execute('Pedro', 'juan@example.com', 'abcd')
    ).rejects.toThrow('Email already registered');
  });
});
