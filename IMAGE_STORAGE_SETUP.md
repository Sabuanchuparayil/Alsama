# Image Storage Setup Guide

## Why Not Railway Storage?

Railway uses **ephemeral storage** - files are deleted on every deployment or container restart. This means:
- ❌ Images uploaded today will be gone tomorrow
- ❌ Not suitable for production
- ❌ Files don't persist between deployments

**Solution:** Use external cloud storage (Cloudinary, AWS S3, etc.)

---

## Recommended: Cloudinary (FREE)

### Why Cloudinary?
- ✅ **Free tier:** 25GB storage, 25GB bandwidth/month**
- ✅ **Persistent:** Files never deleted
- ✅ **Automatic optimization:** Images optimized automatically
- ✅ **CDN included:** Fast global delivery
- ✅ **No credit card required**
- ✅ **5-minute setup**

### Quick Setup (5 Minutes)

1. **Sign Up (Free):**
   - Visit: https://cloudinary.com/users/register/free
   - Create free account (no credit card needed)

2. **Get Credentials:**
   - After signup, go to Dashboard
   - You'll see:
     - **Cloud Name** (e.g., `dxyz123`)
     - **API Key** (e.g., `123456789012345`)
     - **API Secret** (e.g., `abcdefghijklmnopqrstuvwxyz`)

3. **Add to Railway Variables:**
   
   **Via Railway Dashboard:**
   - Go to: https://railway.com/project/fcb2fbb9-67f1-48be-b96b-c8c53c2939d1
   - Click your **Alsama** service
   - Go to **Variables** tab
   - Add these three variables:
     ```
     CLOUDINARY_CLOUD_NAME=your-cloud-name
     CLOUDINARY_API_KEY=your-api-key
     CLOUDINARY_API_SECRET=your-api-secret
     ```

   **Via Railway CLI:**
   ```bash
   railway variables set CLOUDINARY_CLOUD_NAME="your-cloud-name"
   railway variables set CLOUDINARY_API_KEY="your-api-key"
   railway variables set CLOUDINARY_API_SECRET="your-api-secret"
   ```

4. **Done!** Railway will automatically redeploy and image uploads will work!

---

## Alternative: AWS S3

If you prefer AWS S3:

1. Create S3 bucket in AWS
2. Get credentials
3. Add to Railway:
   ```
   AWS_ACCESS_KEY_ID=your-key
   AWS_SECRET_ACCESS_KEY=your-secret
   AWS_REGION=us-east-1
   AWS_S3_BUCKET_NAME=alsama-images
   ```

---

## Current Status

✅ Code updated to use Cloudinary
⏳ Waiting for Cloudinary credentials to be added to Railway

Once you add the Cloudinary variables, image uploads will work immediately!
