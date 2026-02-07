#!/usr/bin/env tsx

/**
 * Diagnostic script to check if the application is properly configured
 */

import { prisma } from '../lib/db/prisma';

async function checkSetup() {
  console.log('🔍 Checking AL SAMA Setup...\n');

  // Check 1: Environment Variables
  console.log('1️⃣ Checking Environment Variables:');
  const nextAuthSecret = process.env.NEXTAUTH_SECRET;
  const nextAuthUrl = process.env.NEXTAUTH_URL;
  const databaseUrl = process.env.DATABASE_URL;

  if (nextAuthSecret) {
    console.log('   ✅ NEXTAUTH_SECRET is set');
  } else {
    console.log('   ❌ NEXTAUTH_SECRET is missing');
    console.log('      → Create .env.local with: NEXTAUTH_SECRET=your-secret');
  }

  if (nextAuthUrl) {
    console.log(`   ✅ NEXTAUTH_URL is set: ${nextAuthUrl}`);
  } else {
    console.log('   ⚠️  NEXTAUTH_URL is not set (using default)');
  }

  if (databaseUrl) {
    console.log('   ✅ DATABASE_URL is set');
    // Don't print the full URL for security
    const urlPreview = databaseUrl.substring(0, 30) + '...';
    console.log(`      ${urlPreview}`);
  } else {
    console.log('   ❌ DATABASE_URL is missing');
    console.log('      → Add DATABASE_URL to .env.local');
  }

  console.log('');

  // Check 2: Database Connection
  console.log('2️⃣ Checking Database Connection:');
  try {
    await prisma.$connect();
    console.log('   ✅ Database connection successful');
    
    // Check 3: Database Tables
    console.log('\n3️⃣ Checking Database Tables:');
    
    try {
      const userCount = await prisma.user.count();
      console.log(`   ✅ Users table exists (${userCount} users)`);
    } catch (error: any) {
      if (error.message?.includes('does not exist') || error.code === '42P01') {
        console.log('   ❌ Users table does not exist');
        console.log('      → Run: npx prisma migrate dev');
      } else {
        throw error;
      }
    }

    try {
      const vehicleCount = await prisma.vehicle.count();
      console.log(`   ✅ Vehicles table exists (${vehicleCount} vehicles)`);
    } catch (error: any) {
      if (error.message?.includes('does not exist') || error.code === '42P01') {
        console.log('   ❌ Vehicles table does not exist');
        console.log('      → Run: npx prisma migrate dev');
      }
    }

    try {
      const bookingCount = await prisma.booking.count();
      console.log(`   ✅ Bookings table exists (${bookingCount} bookings)`);
    } catch (error: any) {
      if (error.message?.includes('does not exist') || error.code === '42P01') {
        console.log('   ❌ Bookings table does not exist');
        console.log('      → Run: npx prisma migrate dev');
      }
    }

    // Check 4: Admin User
    console.log('\n4️⃣ Checking Admin User:');
    try {
      const adminUsers = await prisma.user.findMany({
        where: { role: 'admin' },
      });
      
      if (adminUsers.length > 0) {
        console.log(`   ✅ Admin user exists (${adminUsers.length} admin(s))`);
        console.log(`      Email: ${adminUsers[0].email}`);
      } else {
        console.log('   ⚠️  No admin user found');
        console.log('      → Run: ADMIN_EMAIL=admin@alsama.ae ADMIN_PASSWORD=YourPass123! npm run create-admin');
      }
    } catch (error: any) {
      console.log('   ❌ Could not check admin user (table may not exist)');
    }

    await prisma.$disconnect();
  } catch (error: any) {
    console.log('   ❌ Database connection failed');
    console.log(`      Error: ${error.message}`);
    
    if (error.message?.includes('P1001') || error.message?.includes('connect')) {
      console.log('      → Check if PostgreSQL is running');
      console.log('      → Verify DATABASE_URL is correct');
    } else if (error.message?.includes('P1003') || error.message?.includes('does not exist')) {
      console.log('      → Database does not exist');
      console.log('      → Create database or check DATABASE_URL');
    } else {
      console.log('      → Check DATABASE_URL format');
    }
  }

  console.log('\n✅ Setup check complete!\n');
  
  // Summary
  if (!nextAuthSecret || !databaseUrl) {
    console.log('⚠️  ACTION REQUIRED:');
    if (!nextAuthSecret) {
      console.log('   - Create .env.local with NEXTAUTH_SECRET');
    }
    if (!databaseUrl) {
      console.log('   - Add DATABASE_URL to .env.local');
    }
    console.log('');
  }
}

checkSetup().catch((error) => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
