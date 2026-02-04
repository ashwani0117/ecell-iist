import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const certificates = pgTable("certificates", {
  id: varchar("id").primaryKey(),
  name: text("name").notNull(),
  file: text("file").notNull(),
});

export const insertCertificateSchema = createInsertSchema(certificates);
export type InsertCertificate = z.infer<typeof insertCertificateSchema>;
export type Certificate = typeof certificates.$inferSelect;
