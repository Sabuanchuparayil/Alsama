# Fix: www.alsamatourism.com 404 Error

## Issue
Getting `404 (Not Found)` when accessing `www.alsamatourism.com`

## Possible Causes

### 1. Domain Not Added in Railway
The domain might not be configured in Railway dashboard.

**Fix:**
1. Go to Railway Dashboard → Your Service
2. Click "Settings" tab
3. Scroll to "Domains" section
4. Click "Add Custom Domain"
5. Enter: `www.alsamatourism.com`
6. Railway will provide DNS instructions

### 2. DNS Not Configured Correctly
The DNS records might not be pointing to Railway.

**Check DNS:**
```bash
# Check if domain resolves
nslookup www.alsamatourism.com
dig www.alsamatourism.com
```

**Fix in Namecheap:**
1. Go to Namecheap → Domain List → alsamatourism.com
2. Click "Manage" → "Advanced DNS"
3. Add/Update CNAME record:
   - **Type:** CNAME
   - **Host:** `www`
   - **Value:** Railway's public domain (e.g., `alsama-production.up.railway.app`)
   - **TTL:** Automatic

### 3. Railway Service Not Running
The deployment might have failed or service is down.

**Check:**
1. Railway Dashboard → Your Service
2. Check "Deployments" tab
3. Verify latest deployment is successful (green checkmark)
4. Check "Metrics" tab for service status

### 4. NEXTAUTH_URL Not Updated
The environment variable might still point to Railway domain.

**Fix:**
1. Railway Dashboard → Your Service → Variables
2. Update `NEXTAUTH_URL` to: `https://www.alsamatourism.com`
3. Railway will auto-redeploy

**Or via CLI:**
```bash
railway variables set NEXTAUTH_URL="https://www.alsamatourism.com"
```

### 5. Root Domain vs WWW
If root domain (`alsamatourism.com`) works but `www` doesn't:
- Add both domains in Railway
- Configure DNS for both

## Step-by-Step Fix

### Step 1: Verify Domain in Railway
1. Railway Dashboard → Service → Settings → Domains
2. Check if `www.alsamatourism.com` is listed
3. If not, click "Add Custom Domain" and add it

### Step 2: Verify DNS Configuration
1. Go to Namecheap → Domain List → alsamatourism.com
2. Advanced DNS → Check CNAME record for `www`
3. Should point to Railway's public domain

### Step 3: Update Environment Variables
```bash
# Update NEXTAUTH_URL
railway variables set NEXTAUTH_URL="https://www.alsamatourism.com"
```

### Step 4: Verify Deployment
1. Check Railway Dashboard → Deployments
2. Ensure latest deployment succeeded
3. Check logs for errors

### Step 5: Wait for DNS Propagation
- DNS changes can take 24-48 hours
- Check propagation: https://dnschecker.org/#CNAME/www.alsamatourism.com

## Quick Diagnostic Commands

```bash
# Check if Railway service is running
railway status

# Check environment variables
railway variables

# View recent logs
railway logs --tail 50

# Check DNS resolution
nslookup www.alsamatourism.com
dig www.alsamatourism.com +short
```

## Common Issues

### Issue: Domain shows "Pending" in Railway
**Solution:** Wait for DNS propagation (can take up to 48 hours)

### Issue: Domain shows "Invalid" in Railway
**Solution:** 
- Verify DNS is configured correctly
- Check CNAME record points to Railway domain
- Ensure no conflicting A records

### Issue: 404 on www but root domain works
**Solution:**
- Add `www.alsamatourism.com` as separate domain in Railway
- Configure separate CNAME for `www` subdomain

## Verification Checklist

- [ ] Domain added in Railway Dashboard
- [ ] CNAME record configured in Namecheap
- [ ] DNS propagated (check dnschecker.org)
- [ ] Railway deployment successful
- [ ] NEXTAUTH_URL updated to www.alsamatourism.com
- [ ] Service is running (check Railway metrics)
- [ ] No errors in Railway logs

## Still Getting 404?

1. **Check Railway Logs:**
   ```bash
   railway logs
   ```
   Look for errors or warnings

2. **Verify Service is Running:**
   - Railway Dashboard → Service → Metrics
   - Check CPU/Memory usage
   - Verify service is active

3. **Test Railway Public Domain:**
   - Visit: `https://alsama-production.up.railway.app`
   - If this works, issue is DNS/domain configuration
   - If this doesn't work, issue is with deployment

4. **Contact Railway Support:**
   - If domain is configured but still 404
   - Railway Dashboard → Help → Support
