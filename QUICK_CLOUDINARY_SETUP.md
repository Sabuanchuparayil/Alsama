# Quick Cloudinary Setup - 5 Minutes

## ✅ Step 1: Sign Up for Cloudinary (FREE)

1. **Visit:** https://cloudinary.com/users/register/free
2. **Sign up** with your email (no credit card needed)
3. **Verify your email**

## ✅ Step 2: Get Your Credentials

1. **Login:** https://console.cloudinary.com
2. **Dashboard shows:**
   - **Cloud Name** (e.g., `dxyz123`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (click "Reveal" to show)

## ✅ Step 3: Add to Railway

### Via Railway Dashboard:

1. **Go to:** https://railway.com/project/fcb2fbb9-67f1-48be-b96b-c8c53c2939d1
2. **Click:** Your **Alsama** service
3. **Go to:** **Variables** tab
4. **Add 3 variables:**

   **Variable 1:**
   - Name: `CLOUDINARY_CLOUD_NAME`
   - Value: (your Cloud Name from Step 2)
   - Click **Add**

   **Variable 2:**
   - Name: `CLOUDINARY_API_KEY`
   - Value: (your API Key from Step 2)
   - Click **Add**

   **Variable 3:**
   - Name: `CLOUDINARY_API_SECRET`
   - Value: (your API Secret from Step 2)
   - Click **Add**

5. **Railway will auto-redeploy** (wait 2-3 minutes)

## ✅ Step 4: Test It!

1. **Go to:** https://alsama-production.up.railway.app/admin/login
2. **Login:** `mail@jsabu.com` / `Abcd!1234`
3. **Go to:** Content → Vehicles → New Vehicle
4. **Upload an image** - Should work! 🎉

---

## Verify Setup (Optional)

After adding variables, verify:

```bash
railway run npm run verify-cloudinary
```

This will test your Cloudinary connection.

---

## That's It! 🎉

Image uploads will now work permanently. Images are stored in Cloudinary and will never be deleted.

---

**Need help?** See `CLOUDINARY_SETUP.md` for detailed instructions.
