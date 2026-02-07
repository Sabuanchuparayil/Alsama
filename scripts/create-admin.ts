import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdmin() {
  const email = process.env.ADMIN_EMAIL || 'admin@alsama.ae';
  const password = process.env.ADMIN_PASSWORD || 'ChangeThisPassword123!';
  
  if (!password || password === 'ChangeThisPassword123!') {
    console.warn('⚠️  Using default password. Please set ADMIN_PASSWORD environment variable!');
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    
    if (existingUser) {
      console.log('ℹ️  Admin user already exists with this email.');
      console.log('   To update password, delete the user first or update manually.');
      return;
    }
    
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        role: 'admin',
      },
    });
    
    console.log('\n✅ Admin user created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📧 Email:    ${email}`);
    console.log(`🔑 Password: ${password}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n⚠️  IMPORTANT: Change the password after first login!');
    console.log('   Login at: /admin/login\n');
  } catch (error: any) {
    if (error.code === 'P2002') {
      console.log('ℹ️  Admin user already exists with this email.');
    } else {
      console.error('❌ Error creating admin:', error);
      process.exit(1);
    }
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
