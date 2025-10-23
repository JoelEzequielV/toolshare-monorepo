import { Tool } from '../entities/Tool';

export interface IToolRepository {
  save(tool: Tool): Promise<void>;
  findById(id: string): Promise<Tool | undefined>;
  getAll(): Promise<Tool[]>;
}
