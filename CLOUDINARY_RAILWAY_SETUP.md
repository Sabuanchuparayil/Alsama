# Cloudinary Configuration for Railway

## Your Cloudinary Credentials

Based on your provided details:
- **Cloud Name:** `Al sama` (Note: Cloudinary cloud names are usually lowercase, no spaces)
- **API Key:** `1722117493324765`
- **API Secret:** `RheiMmu93XDaYKoG06b0M1c6N8`

⚠️ **Important:** Cloudinary cloud names are typically lowercase with hyphens. Your cloud name might be:
- `al-sama` (most likely)
- `alsama`
- Or check your Cloudinary dashboard for the exact cloud name

---

## Step 1: Verify Cloud Name

1. **Login to Cloudinary Dashboard:**
   - Go to: https://console.cloudinary.com
   - Login to your account

2. **Check Your Cloud Name:**
   - Look at the top of the dashboard
   - The cloud name is usually displayed in the URL or header
   - It's typically lowercase (e.g., `al-sama`, `alsama`)

3. **Note the Exact Cloud Name:**
   - Use the exact cloud name from your dashboard
   - It should match what's shown in Cloudinary

---

## Step 2: Add Environment Variables to Railway

### Option A: Via Railway Dashboard (Recommended)

1. **Go to Railway Dashboard:**
   - Visit: https://railway.com/project/fcb2fbb9-67f1-48be-b96b-c8c53c2939d1
   - Click on your **Alsama** service

2. **Go to Variables Tab:**
   - Click on **"Variables"** tab
   - You'll see existing environment variables

3. **Add Cloudinary Variables:**
   - Click **"New Variable"** button
   - Add each variable one by one:

   **Variable 1:**
   - **Name:** `CLOUDINARY_CLOUD_NAME`
   - **Value:** `al-sama` (or your exact cloud name from dashboard)
   - Click **"Add"**

   **Variable 2:**
   - **Name:** `CLOUDINARY_API_KEY`
   - **Value:** `1722117493324765`
   - Click **"Add"**

   **Variable 3:**
   - **Name:** `CLOUDINARY_API_SECRET`
   - **Value:** `RheiMmu93XDaYKoG06b0M1c6N8`
   - Click **"Add"**

4. **Railway will automatically redeploy** after adding variables

### Option B: Via Railway CLI

```bash
# Login to Railway
railway login

# Link to your project
railway link

# Add Cloudinary variables
railway variables set CLOUDINARY_CLOUD_NAME="al-sama"
railway variables set CLOUDINARY_API_KEY="1722117493324765"
railway variables set CLOUDINARY_API_SECRET="RheiMmu93XDaYKoG06b0M1c6N8"
```

---

## Step 3: Verify Configuration

After Railway redeploys, verify the configuration:

### Option A: Use Verification Script

```bash
# Via Railway CLI
railway run npm run verify-cloudinary
```

### Option B: Check Railway Variables

1. Railway Dashboard → Service → Variables
2. Verify all three variables are present:
   - ✅ `CLOUDINARY_CLOUD_NAME`
   - ✅ `CLOUDINARY_API_KEY`
   - ✅ `CLOUDINARY_API_SECRET`

---

## Step 4: Test Image Upload

1. **Access Admin Panel:**
   - Go to: `https://www.alsamatourism.com/admin/login`
   - Login with admin credentials

2. **Test Upload:**
   - Go to: `/admin/content/vehicles/new`
   - Or: `/admin/content/hero`
   - Try uploading an image
   - Should upload to Cloudinary successfully

3. **Verify Upload:**
   - Check Cloudinary Dashboard → Media Library
   - Images should appear in `alsama` folder

---

## Environment Variables Summary

Add these to Railway:

```env
CLOUDINARY_CLOUD_NAME=al-sama
CLOUDINARY_API_KEY=1722117493324765
CLOUDINARY_API_SECRET=RheiMmu93XDaYKoG06b0M1c6N8
```

⚠️ **Replace `al-sama` with your actual Cloudinary cloud name if different!**

---

## Troubleshooting

### Issue: "Invalid cloud name" error

**Solution:**
- Verify cloud name in Cloudinary dashboard
- Cloud names are case-sensitive
- Usually lowercase with hyphens (no spaces)

### Issue: "Invalid API key" error

**Solution:**
- Double-check API key: `1722117493324765`
- Ensure no extra spaces
- Copy directly from Cloudinary dashboard

### Issue: "Invalid API secret" error

**Solution:**
- Double-check API secret: `RheiMmu93XDaYKoG06b0M1c6N8`
- Ensure no extra spaces
- Copy directly from Cloudinary dashboard

### Issue: Images not uploading

**Solution:**
1. Check Railway logs:
   ```bash
   railway logs
   ```
2. Look for Cloudinary errors
3. Verify all three variables are set
4. Test with verification script:
   ```bash
   railway run npm run verify-cloudinary
   ```

---

## Quick Setup Checklist

- [ ] Verified cloud name in Cloudinary dashboard
- [ ] Added `CLOUDINARY_CLOUD_NAME` to Railway
- [ ] Added `CLOUDINARY_API_KEY` to Railway
- [ ] Added `CLOUDINARY_API_SECRET` to Railway
- [ ] Railway redeployed successfully
- [ ] Verified configuration with script
- [ ] Tested image upload in admin panel
- [ ] Images appear in Cloudinary dashboard

---

## Expected Cloud Name Format

Cloudinary cloud names are typically:
- ✅ `al-sama` (lowercase with hyphen)
- ✅ `alsama` (lowercase, no spaces)
- ❌ `Al sama` (has spaces and capital - not valid)
- ❌ `Al-sama` (has capital - might work but lowercase is standard)

**Check your Cloudinary dashboard to confirm the exact cloud name!**

---

## After Configuration

Once configured:
- ✅ Image uploads will go to Cloudinary
- ✅ Images will be optimized automatically
- ✅ Images will be served via CDN
- ✅ Images stored in `alsama` folder in Cloudinary

---

**Next Steps:**
1. Add variables to Railway
2. Wait for redeploy
3. Test image upload
4. Verify in Cloudinary dashboard
