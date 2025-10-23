import { Tool } from '../entities/Tool';
import { IToolRepository } from '../repositories/IToolRepository';
import { randomUUID } from 'crypto';

export class AddTool {
  constructor(private toolRepo: IToolRepository) {}

  async execute(name: string, description: string): Promise<Tool> {
    const tool = new Tool(randomUUID(), name, description, true);
    await this.toolRepo.save(tool);
    return tool;
  }
}
