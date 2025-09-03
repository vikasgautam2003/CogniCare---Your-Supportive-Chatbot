// // lib/prisma.ts
// import { PrismaClient } from "@prisma/client";

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// // Prevent multiple instances of Prisma Client in development
// export const prisma =
//   global.prisma ||
//   new PrismaClient({
//     log: ["query"],
//   });

// if (process.env.NODE_ENV !== "production") global.prisma = prisma;




// lib/prisma.ts
import { PrismaClient}  from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma