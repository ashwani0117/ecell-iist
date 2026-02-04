import { type Certificate, type InsertCertificate } from "@shared/schema";

export interface IStorage {
  // We keep this interface even if unused for static site to satisfy template structure
  healthCheck(): Promise<string>;
}

export class MemStorage implements IStorage {
  async healthCheck(): Promise<string> {
    return "OK";
  }
}

export const storage = new MemStorage();
