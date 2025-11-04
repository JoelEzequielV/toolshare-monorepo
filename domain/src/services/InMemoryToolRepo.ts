import { IToolRepository } from '../repositories/IToolRepository';
import { Tool } from '../entities/Tool';

export class InMemoryToolRepo implements IToolRepository {
  private tools: Tool[] = [];

  async save(tool: Tool): Promise<void> {
    const index = this.tools.findIndex(t => t.id === tool.id);
    if (index >= 0) {
      this.tools[index] = tool;
    } else {
      this.tools.push(tool);
    }
  }

  async findById(id: string): Promise<Tool | undefined> {
    return this.tools.find(t => t.id === id);
  }


  async getAll(): Promise<Tool[]> {
    return [...this.tools]; 
  }

  async delete(id: string): Promise<void> {
    this.tools = this.tools.filter(t => t.id !== id);
  }

  async clear(): Promise<void> {
    this.tools = [];
  }
}
