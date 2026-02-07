# API Route 405 Error Fix

## Issue
PUT request to `/api/cms/site-settings` was returning `405 Method Not Allowed` error.

## Root Cause
The route handler was correctly defined, but Next.js might not have been recognizing it properly in production. This can happen due to:
1. Route segment configuration missing
2. Build cache issues
3. Deployment not picking up the route

## Fixes Applied

### 1. Added Route Segment Config
```typescript
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
```

This ensures:
- Route runs in Node.js runtime (required for Prisma)
- Route is always dynamic (no static generation)

### 2. Improved Error Handling
Updated the frontend to handle HTML error responses gracefully:
```typescript
try {
  const errorData = await res.json();
  errorMessage = errorData.error || errorMessage;
} catch (parseError) {
  errorMessage = `Error ${res.status}: ${res.statusText || 'Method not allowed'}`;
}
```

### 3. Updated Image Config
Removed Supabase image patterns and added Cloudinary patterns in `next.config.js`.

## Testing

After Railway redeploys:
1. Go to `/admin/settings/contact`
2. Update contact information
3. Click "Save Contact Information"
4. Should see success message (not 405 error)

## If Still Getting 405 Error

1. **Check Railway Logs**: Verify the route file is being built
2. **Clear Build Cache**: Railway should auto-rebuild, but you can trigger a manual redeploy
3. **Verify Route File**: Ensure `app/api/cms/site-settings/route.ts` exists and exports `PUT` function
4. **Check Next.js Version**: Ensure Next.js 14.2.15+ is installed

## Files Changed
- ✅ `app/api/cms/site-settings/route.ts` - Added route config
- ✅ `app/admin/settings/contact/page.tsx` - Improved error handling
- ✅ `next.config.js` - Updated image config for Cloudinary
