// src/lib/prisma.ts
import { PrismaClient } from "../generated/prisma"; // ✅ adjust path

declare global {
  // Prevent multiple instances in dev
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL, 
      },
    },
    log: ["query", "info", "warn", "error"],
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
