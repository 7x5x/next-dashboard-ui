// lib/prisma.js
import { PrismaClient } from "@prisma/client";

// Create a new instance of the PrismaClient
const prisma = new PrismaClient();

// Optional: Log Prisma queries to the console
if (process.env.NODE_ENV !== "production") {
  prisma.$use(async (params:any, next:any) => {
    const before = Date.now();
    const result = await next(params);
    const after = Date.now();
    console.log(
      `Query ${params.model}.${params.action} took ${after - before}ms`
    );
    return result;
  });
}

// Export the Prisma client instance
export default prisma;
