# Cloudinary Setup Guide - Step by Step

## Quick Setup (5 Minutes)

### Step 1: Create Cloudinary Account

1. **Visit:** https://cloudinary.com/users/register/free
2. **Sign Up:**
   - Enter your email
   - Create a password
   - Click "Create Account"
   - **No credit card required!**

3. **Verify Email:**
   - Check your email for verification link
   - Click to verify

### Step 2: Get Your Credentials

1. **Login to Cloudinary:**
   - Go to: https://console.cloudinary.com
   - You'll see your Dashboard

2. **Find Your Credentials:**
   - Look at the top of the dashboard
   - You'll see:
     - **Cloud Name** (e.g., `dxyz123`)
     - **API Key** (e.g., `123456789012345`)
     - **API Secret** (click "Reveal" to show it)

3. **Copy All Three:**
   - Cloud Name: `________________`
   - API Key: `________________`
   - API Secret: `________________`

### Step 3: Add to Railway

**Option A: Via Railway Dashboard (Easiest)**

1. Go to: https://railway.com/project/fcb2fbb9-67f1-48be-b96b-c8c53c2939d1
2. Click your **Alsama** service
3. Go to **Variables** tab
4. Click **"New Variable"** (three times, once for each)
5. Add:
   - **Name:** `CLOUDINARY_CLOUD_NAME`
   - **Value:** (paste your Cloud Name)
   - Click **"Add"**
   
   - **Name:** `CLOUDINARY_API_KEY`
   - **Value:** (paste your API Key)
   - Click **"Add"**
   
   - **Name:** `CLOUDINARY_API_SECRET`
   - **Value:** (paste your API Secret)
   - Click **"Add"**

6. Railway will automatically redeploy (takes 2-3 minutes)

**Option B: Via Railway CLI**

```bash
railway variables set CLOUDINARY_CLOUD_NAME="your-cloud-name"
railway variables set CLOUDINARY_API_KEY="your-api-key"
railway variables set CLOUDINARY_API_SECRET="your-api-secret"
```

### Step 4: Verify Setup

1. **Wait for Railway to redeploy** (check Railway dashboard)
2. **Test Image Upload:**
   - Go to: https://alsama-production.up.railway.app/admin/login
   - Login with: `mail@jsabu.com` / `Abcd!1234`
   - Go to: Content → Vehicles → New Vehicle
   - Try uploading an image
   - Should work! ✅

---

## What Cloudinary Provides

- ✅ **25GB Free Storage**
- ✅ **25GB Free Bandwidth/month**
- ✅ **Automatic Image Optimization** (WebP, AVIF formats)
- ✅ **CDN** (Fast global delivery)
- ✅ **Image Transformations** (resize, crop, etc.)
- ✅ **Secure URLs**

---

## Cloudinary Dashboard

After setup, you can:
- View all uploaded images: https://console.cloudinary.com/console/media_library
- See usage statistics
- Manage images
- Configure transformations

---

## Troubleshooting

### "Image storage not configured" Error

**Check:**
1. All three variables are set in Railway
2. Variable names are exact (case-sensitive):
   - `CLOUDINARY_CLOUD_NAME`
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
3. No extra spaces in values
4. Railway has redeployed after adding variables

### Upload Fails

**Check:**
1. Cloudinary credentials are correct
2. File size is under 5MB
3. File type is JPEG, PNG, or WebP
4. Check Railway logs: `railway logs`

### Images Not Showing

**Check:**
1. Image URL is correct (should be from `res.cloudinary.com`)
2. Cloudinary account is active
3. Check browser console for errors

---

## Free Tier Limits

- **Storage:** 25GB
- **Bandwidth:** 25GB/month
- **Transformations:** Unlimited
- **Uploads:** Unlimited

**For most websites, this is more than enough!**

---

## Need Help?

- Cloudinary Docs: https://cloudinary.com/documentation
- Cloudinary Support: https://support.cloudinary.com
- Check Railway logs: `railway logs`

---

**Ready to set up? Follow Step 1-3 above!**
