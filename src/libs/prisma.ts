import { PrismaClient } from '@prisma/client'

// Es importante esto porque si no, no se puede conectar a la base de datos
export const prisma = new PrismaClient();