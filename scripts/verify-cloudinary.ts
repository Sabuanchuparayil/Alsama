import { v2 as cloudinary } from 'cloudinary';

async function verifyCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  console.log('\n🔍 Verifying Cloudinary Configuration...\n');

  if (!cloudName || !apiKey || !apiSecret) {
    console.log('❌ Cloudinary credentials not found!\n');
    console.log('Missing variables:');
    if (!cloudName) console.log('  - CLOUDINARY_CLOUD_NAME');
    if (!apiKey) console.log('  - CLOUDINARY_API_KEY');
    if (!apiSecret) console.log('  - CLOUDINARY_API_SECRET');
    console.log('\n📝 Please add these to Railway variables.');
    console.log('   See: IMAGE_STORAGE_SETUP.md for instructions.\n');
    process.exit(1);
  }

  console.log('✅ All environment variables found!\n');
  console.log(`   Cloud Name: ${cloudName}`);
  console.log(`   API Key: ${apiKey.substring(0, 8)}...`);
  console.log(`   API Secret: ${apiSecret.substring(0, 8)}...\n`);

  // Configure Cloudinary
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });

  // Test connection
  try {
    console.log('🔄 Testing Cloudinary connection...\n');
    const result = await cloudinary.api.ping();
    
    if (result.status === 'ok') {
      console.log('✅ Cloudinary connection successful!\n');
      console.log('🎉 Image storage is configured and ready to use!\n');
      console.log('📝 Next steps:');
      console.log('   1. Test image upload in admin panel');
      console.log('   2. Go to: /admin/content/vehicles/new');
      console.log('   3. Try uploading an image\n');
    } else {
      console.log('⚠️  Cloudinary responded but status is not OK');
      console.log('   Result:', result);
    }
  } catch (error: any) {
    console.log('❌ Cloudinary connection failed!\n');
    console.log('Error:', error.message);
    console.log('\n📝 Please verify:');
    console.log('   1. Credentials are correct');
    console.log('   2. Cloudinary account is active');
    console.log('   3. No typos in environment variables\n');
    process.exit(1);
  }
}

verifyCloudinary();
