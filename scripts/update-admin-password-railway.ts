import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

// Use Railway's DATABASE_URL from environment
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function updateAdminPassword() {
  // Get email from environment or use default
  const email = process.env.ADMIN_EMAIL || 'mail@jsabu.com';
  const newPassword = process.env.ADMIN_PASSWORD || 'Admin @1234';
  
  console.log('\n🔐 Updating Admin Password');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📧 Email:    ${email}`);
  console.log(`🔑 New Password: ${newPassword}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  // Check DATABASE_URL
  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL not found!');
    console.log('\n💡 Make sure you are:');
    console.log('   1. Running via Railway CLI: railway run ...');
    console.log('   2. Or have DATABASE_URL set in environment');
    process.exit(1);
  }
  
  try {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    
    if (!user) {
      console.error(`❌ User with email ${email} not found!`);
      console.log('\n💡 Available options:');
      console.log('   1. Check the email address is correct');
      console.log('   2. Create new admin user with: npm run create-admin');
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
    if (error.message.includes('denied access')) {
      console.log('\n💡 Database connection issue!');
      console.log('   Make sure you are running via Railway CLI:');
      console.log('   railway run ADMIN_EMAIL="mail@jsabu.com" ADMIN_PASSWORD="Admin @1234" npm run update-admin-password');
    }
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

updateAdminPassword();
