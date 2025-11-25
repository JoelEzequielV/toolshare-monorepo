import { Tool } from "../types/Tool";

export class AddToolUseCase {
  constructor(private repo: { add: (tool: Omit<Tool, "id">, token: string) => Promise<Tool> }) {}

  async execute(tool: Omit<Tool, "id">, token: string): Promise<Tool> {
    return await this.repo.add(tool, token);
  }
}
