import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function updateAdmin() {
  const oldEmail = 'admin@alsama.ae';
  const newEmail = 'mail@jsabu.com';
  const newPassword = 'Abcd!1234';
  
  try {
    // Find existing admin user
    const existingUser = await prisma.user.findUnique({
      where: { email: oldEmail },
    });
    
    if (!existingUser) {
      console.log(`❌ User with email ${oldEmail} not found.`);
      console.log('Checking if new email already exists...');
      
      const newUserExists = await prisma.user.findUnique({
        where: { email: newEmail },
      });
      
      if (newUserExists) {
        console.log(`✅ User with email ${newEmail} already exists. Updating password...`);
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
          where: { email: newEmail },
          data: { passwordHash: hashedPassword },
        });
        console.log('✅ Password updated successfully!');
      } else {
        console.log('Creating new admin user...');
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.create({
          data: {
            email: newEmail,
            passwordHash: hashedPassword,
            role: 'admin',
          },
        });
        console.log('✅ New admin user created successfully!');
      }
    } else {
      // Update existing user
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      
      // Check if new email already exists
      const emailConflict = await prisma.user.findUnique({
        where: { email: newEmail },
      });
      
      if (emailConflict && emailConflict.id !== existingUser.id) {
        console.log(`❌ Email ${newEmail} is already in use by another user.`);
        console.log('Updating password for existing user instead...');
        await prisma.user.update({
          where: { email: oldEmail },
          data: { passwordHash: hashedPassword },
        });
        console.log('✅ Password updated. Email remains: ' + oldEmail);
      } else {
        // Update email and password
        await prisma.user.update({
          where: { email: oldEmail },
          data: {
            email: newEmail,
            passwordHash: hashedPassword,
          },
        });
        console.log('✅ Admin credentials updated successfully!');
      }
    }
    
    console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 New Email:    ' + newEmail);
    console.log('🔑 New Password: ' + newPassword);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n⚠️  IMPORTANT: Save these credentials securely!');
    console.log('   Login at: /admin/login\n');
  } catch (error: any) {
    console.error('❌ Error updating admin:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

updateAdmin();
