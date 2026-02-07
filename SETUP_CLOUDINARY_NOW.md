# 🚀 Set Up Cloudinary Now - Quick Guide

## Why Cloudinary?

- ✅ **FREE** - 25GB storage, 25GB bandwidth/month
- ✅ **Persistent** - Images never deleted (unlike Railway storage)
- ✅ **Fast** - Global CDN included
- ✅ **Automatic optimization** - Images optimized automatically
- ✅ **5-minute setup**

---

## Setup Steps

### 1️⃣ Sign Up (1 minute)

**Visit:** https://cloudinary.com/users/register/free

- Enter email
- Create password
- Click "Create Account"
- Verify email

### 2️⃣ Get Credentials (1 minute)

**Login:** https://console.cloudinary.com

**Copy these 3 values:**
- **Cloud Name:** `________________`
- **API Key:** `________________`
- **API Secret:** `________________` (click "Reveal")

### 3️⃣ Add to Railway (2 minutes)

**Go to Railway Dashboard:**
https://railway.com/project/fcb2fbb9-67f1-48be-b96b-c8c53c2939d1

1. Click **Alsama** service
2. Go to **Variables** tab
3. Click **"New Variable"** (3 times)

**Add these 3 variables:**

```
Variable 1:
Name:  CLOUDINARY_CLOUD_NAME
Value: [paste your Cloud Name]

Variable 2:
Name:  CLOUDINARY_API_KEY
Value: [paste your API Key]

Variable 3:
Name:  CLOUDINARY_API_SECRET
Value: [paste your API Secret]
```

4. Railway will redeploy automatically

### 4️⃣ Test (1 minute)

1. Wait for Railway to finish deploying
2. Go to: https://alsama-production.up.railway.app/admin/login
3. Login: `mail@jsabu.com` / `Abcd!1234`
4. Go to: **Content → Vehicles → New Vehicle**
5. **Upload an image** - It should work! ✅

---

## Verify Setup

After adding variables, verify it works:

```bash
railway run npm run verify-cloudinary
```

Or test directly in admin panel by uploading an image.

---

## Done! 🎉

Your image storage is now configured and will work permanently!

**Images will be stored at:** `https://res.cloudinary.com/your-cloud-name/image/upload/...`

---

## Troubleshooting

**"Image storage not configured" error:**
- Check all 3 variables are added
- Check variable names are exact (case-sensitive)
- Wait for Railway to finish redeploying

**Upload fails:**
- Verify credentials are correct
- Check file size (max 5MB)
- Check file type (JPEG, PNG, WebP only)

---

**Total time: ~5 minutes**
