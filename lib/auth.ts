import bcrypt from 'bcryptjs';
import { prisma } from './db/prisma';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function createAdminUser(email: string, password: string) {
  const hashedPassword = await hashPassword(password);
  return prisma.user.create({
    data: {
      email,
      passwordHash: hashedPassword,
      role: 'admin',
    },
  });
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}
