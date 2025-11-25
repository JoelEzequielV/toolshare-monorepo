import { AuthResponse } from "../types/User";

export class LoginUseCase {
  constructor(
    private repo: { login: (email: string, password: string) => Promise<AuthResponse> }
  ) {}

  async execute(email: string, password: string): Promise<AuthResponse> {
    return await this.repo.login(email, password);
  }
}
