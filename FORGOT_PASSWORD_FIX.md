# Forgot Password Function - Troubleshooting & Fix

## Why Forgot Password Isn't Working

The forgot password function requires **Resend API Key** to send emails. If `RESEND_API_KEY` is not configured, the function will:
- ✅ Still create the reset token
- ✅ Return success message
- ❌ **NOT send the email** (silently fails)

---

## Solution 1: Configure Resend (Recommended)

### Step 1: Get Resend API Key

1. **Sign up for Resend:**
   - Go to: https://resend.com
   - Create a free account
   - Free tier includes 3,000 emails/month

2. **Get API Key:**
   - Go to: https://resend.com/api-keys
   - Click "Create API Key"
   - Copy the API key (starts with `re_`)

3. **Add to Railway:**
   - Railway Dashboard → Service → Variables
   - Add variable:
     - **Name:** `RESEND_API_KEY`
     - **Value:** `re_your_api_key_here`
   - Railway will auto-redeploy

### Step 2: Verify Domain (Optional)

For production, verify your domain in Resend:
- Go to: https://resend.com/domains
- Add domain: `alsamatourism.com`
- Add DNS records as instructed
- This allows sending from `noreply@alsamatourism.com`

---

## Solution 2: Update Password Directly (Quick Fix)

If you need to change the password immediately without email:

### Via Railway CLI

```bash
# Update password to "Admin @1234"
railway run ADMIN_EMAIL="mail@jsabu.com" ADMIN_PASSWORD="Admin @1234" npm run update-admin-password
```

### Via Local Script

```bash
# Set environment variables
export ADMIN_EMAIL="mail@jsabu.com"
export ADMIN_PASSWORD="Admin @1234"

# Run update script
npm run update-admin-password
```

### Via Database (Advanced)

If you have direct database access:

```sql
-- Get user ID
SELECT id, email FROM users WHERE email = 'mail@jsabu.com';

-- Update password (hash of "Admin @1234")
-- Note: You need to generate bcrypt hash first
UPDATE users 
SET password_hash = '$2a$10$...' 
WHERE email = 'mail@jsabu.com';
```

---

## Solution 3: Development Mode - Get Token Directly

In development mode, the forgot password API returns the reset token:

1. **Request password reset:**
   ```bash
   curl -X POST http://localhost:3000/api/auth/forgot-password \
     -H "Content-Type: application/json" \
     -d '{"email":"mail@jsabu.com"}'
   ```

2. **Response includes token:**
   ```json
   {
     "message": "If an account exists...",
     "token": "abc123...",
     "resetUrl": "http://localhost:3000/admin/reset-password?token=abc123..."
   }
   ```

3. **Use the reset URL directly:**
   - Copy the `resetUrl` from response
   - Open in browser
   - Set new password

---

## Current Admin Password Update

### Quick Update Command

```bash
# For Railway
railway run ADMIN_EMAIL="mail@jsabu.com" ADMIN_PASSWORD="Admin @1234" npm run update-admin-password

# For Local
ADMIN_EMAIL="mail@jsabu.com" ADMIN_PASSWORD="Admin @1234" npm run update-admin-password
```

### What This Does

1. Finds user with email `mail@jsabu.com`
2. Hashes the new password `Admin @1234`
3. Updates the password in database
4. Confirms success

---

## Testing Forgot Password

### After Configuring Resend

1. **Go to:** `/admin/forgot-password`
2. **Enter email:** `mail@jsabu.com`
3. **Submit form**
4. **Check email inbox** for reset link
5. **Click reset link** or copy URL
6. **Set new password**

### Check Email Sending

1. **Check Railway Logs:**
   ```bash
   railway logs
   ```
   Look for email sending errors

2. **Check Resend Dashboard:**
   - Go to: https://resend.com/emails
   - See sent emails and status

---

## Troubleshooting

### Issue: "Email not received"

**Possible Causes:**
1. `RESEND_API_KEY` not set
2. Email in spam folder
3. Invalid email address
4. Resend account issue

**Solutions:**
1. Verify `RESEND_API_KEY` in Railway variables
2. Check spam/junk folder
3. Verify email address is correct
4. Check Resend dashboard for errors

### Issue: "Reset token expired"

**Solution:**
- Tokens expire in 1 hour
- Request new reset link
- Or update password directly using script

### Issue: "Invalid reset token"

**Possible Causes:**
1. Token already used
2. Token expired
3. Wrong token copied

**Solutions:**
1. Request new reset link
2. Use direct password update script
3. Double-check token from email

---

## Environment Variables Summary

### Required for Email Sending

```env
RESEND_API_KEY=re_your_api_key_here
```

### Optional (for custom from address)

```env
RESEND_FROM_EMAIL=noreply@alsamatourism.com
```

---

## Quick Reference

### Update Password Directly
```bash
railway run ADMIN_EMAIL="mail@jsabu.com" ADMIN_PASSWORD="Admin @1234" npm run update-admin-password
```

### Configure Email Sending
1. Get Resend API key: https://resend.com/api-keys
2. Add to Railway: `RESEND_API_KEY=re_...`
3. Test forgot password function

### Current Admin Credentials
- **Email:** `mail@jsabu.com`
- **Password:** `Admin @1234` (after update)

---

## Next Steps

1. ✅ **Update password immediately:**
   ```bash
   railway run ADMIN_EMAIL="mail@jsabu.com" ADMIN_PASSWORD="Admin @1234" npm run update-admin-password
   ```

2. ⚙️ **Configure Resend (for forgot password):**
   - Sign up: https://resend.com
   - Get API key
   - Add to Railway variables

3. ✅ **Test forgot password:**
   - After Resend is configured
   - Test email delivery
   - Verify reset link works

---

**Note:** The forgot password function works, but emails won't send without `RESEND_API_KEY`. Use the direct password update script for immediate password changes.
