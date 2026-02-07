# New Features Added

## ✅ Completed Features

### 1. Password Reset Functionality

**What was added:**
- Password reset token system with database model
- Forgot password page (`/admin/forgot-password`)
- Reset password page (`/admin/reset-password`)
- API endpoints for password reset flow
- Email integration (via Resend) for sending reset links
- Security features: token expiration (1 hour), one-time use tokens

**How to use:**
1. Go to `/admin/login`
2. Click "Forgot your password?" link
3. Enter your email address
4. Check your email for reset link (or use the token in development mode)
5. Click the link and set a new password

**Database Changes:**
- New `PasswordResetToken` model added
- Tokens expire after 1 hour
- Tokens are marked as used after successful reset

**API Endpoints:**
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token

---

### 2. Image Storage Configuration

**What was added:**
- Better error handling for image uploads
- Development fallback to local storage (`/public/uploads`)
- Clear error messages with configuration hints
- Support for Supabase Storage (when configured)

**Configuration Options:**

**Option 1: Supabase Storage (Recommended for Production)**
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-anon-key
SUPABASE_STORAGE_BUCKET=alsama-images
```

**Option 2: Local Storage (Development Only)**
- Automatically used in development mode
- Images saved to `/public/uploads/`
- Not recommended for production

**Option 3: Other Cloud Storage**
- Can be extended to support AWS S3, Cloudinary, etc.
- Modify `app/api/upload/image/route.ts`

**Error Messages:**
- Clear error messages when storage is not configured
- Helpful hints for setting up Supabase or other services

---

### 3. Hero Image Carousel/Scrolling

**What was added:**
- Multiple image support for hero section
- Automatic image transitions (carousel)
- Configurable transition interval (2-10 seconds)
- Carousel indicators (dots) for navigation
- Smooth fade transitions between images
- Admin interface for managing carousel

**How to use:**
1. Go to `/admin/content/hero`
2. Check "Enable Image Carousel (Slideshow)"
3. Set carousel interval (milliseconds)
4. Add multiple images:
   - Enter image URLs manually, OR
   - Upload images (they'll be added to carousel)
5. Save the hero content

**Features:**
- Automatic image rotation
- Clickable indicators to jump to specific image
- Smooth fade transitions
- Works with single image or multiple images
- Falls back to single image if carousel disabled

**Database Changes:**
- Added `enableCarousel` boolean field
- Added `carouselInterval` integer field (milliseconds)
- Added `carouselImages` string array field

---

## 📋 Database Migration

A new migration has been created:
- `20260207113019_add_password_reset_and_carousel`

**To apply the migration:**
```bash
# Local development
npx prisma migrate deploy

# Railway (already applied)
railway run npx prisma migrate deploy
```

---

## 🔧 Configuration

### Environment Variables

**Required:**
- `DATABASE_URL` - Already configured
- `NEXTAUTH_SECRET` - Already configured
- `NEXTAUTH_URL` - Already configured

**Optional (for password reset emails):**
- `RESEND_API_KEY` - For sending password reset emails

**Optional (for image storage):**
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_KEY` - Supabase anon key
- `SUPABASE_STORAGE_BUCKET` - Storage bucket name (default: `alsama-images`)

---

## 🚀 Next Steps

1. **Test Password Reset:**
   - Try the forgot password flow
   - Verify email sending (if Resend is configured)
   - Test reset link functionality

2. **Configure Image Storage:**
   - Set up Supabase Storage (recommended)
   - Or configure another cloud storage service
   - Test image uploads in admin panel

3. **Set Up Hero Carousel:**
   - Go to `/admin/content/hero`
   - Enable carousel
   - Add multiple hero images
   - Adjust transition interval
   - Preview on homepage

---

## 📝 Notes

- Password reset tokens expire after 1 hour
- Image uploads work in development without configuration (local storage)
- Carousel requires at least 2 images to function
- All features are backward compatible with existing data

---

## 🐛 Troubleshooting

### Password Reset Not Working
- Check if `RESEND_API_KEY` is set (optional, but needed for emails)
- In development, check console for reset token/URL
- Verify database migration was applied

### Image Upload Failing
- Check Supabase configuration (if using Supabase)
- In development, check `/public/uploads/` directory permissions
- Verify file size (max 5MB) and type (JPEG, PNG, WebP)

### Carousel Not Working
- Ensure carousel is enabled in admin panel
- Add at least 2 images to carousel
- Check browser console for errors
- Verify images are accessible URLs

---

**Last Updated:** 2024-02-07
