import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Basic health check route
  app.get("/api/health", async (req, res) => {
    const status = await storage.healthCheck();
    res.json({ status });
  });

  return httpServer;
}
