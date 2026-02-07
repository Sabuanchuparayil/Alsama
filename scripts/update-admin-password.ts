import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function updateAdminPassword() {
  // Get email from environment or use default
  const email = process.env.ADMIN_EMAIL || 'mail@jsabu.com';
  const newPassword = process.env.ADMIN_PASSWORD || 'Admin @1234';
  
  console.log('\n🔐 Updating Admin Password');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📧 Email:    ${email}`);
  console.log(`🔑 New Password: ${newPassword}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  try {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    
    if (!user) {
      console.error(`❌ User with email ${email} not found!`);
      console.log('\n💡 Available options:');
      console.log('   1. Create new admin user with: npm run create-admin');
      console.log('   2. Check the email address is correct');
      process.exit(1);
    }
    
    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // Update password
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: hashedPassword },
    });
    
    console.log('✅ Password updated successfully!');
    console.log('\n📝 Login credentials:');
    console.log(`   Email:    ${email}`);
    console.log(`   Password: ${newPassword}`);
    console.log('\n🔗 Login at: /admin/login\n');
  } catch (error: any) {
    console.error('❌ Error updating password:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

updateAdminPassword();
