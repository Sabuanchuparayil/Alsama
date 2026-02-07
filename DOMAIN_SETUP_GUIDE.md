# Custom Domain Setup Guide - Namecheap to Railway

Complete guide for connecting your Namecheap domain to your Railway deployment.

## Prerequisites

- ✅ Namecheap account with a domain
- ✅ Railway account with deployed application
- ✅ Access to Namecheap DNS settings

---

## Step 1: Add Domain in Railway

### Option A: Via Railway Dashboard (Recommended)

1. **Go to Railway Dashboard:**
   - Visit: https://railway.com/project/fcb2fbb9-67f1-48be-b96b-c8c53c2939d1
   - Click on your **Alsama** service

2. **Add Custom Domain:**
   - Go to **Settings** tab
   - Scroll to **Domains** section
   - Click **"Add Custom Domain"** or **"Generate Domain"** (if you want to add custom later)
   - Enter your domain (e.g., `alsama.ae` or `www.alsama.ae`)
   - Click **"Add"**

3. **Get DNS Configuration:**
   - Railway will show you DNS records to add
   - You'll see something like:
     ```
     Type: CNAME
     Name: @ (or www)
     Value: alsama-production.up.railway.app
     ```

### Option B: Via Railway CLI

```bash
# Add custom domain
railway domain add yourdomain.com

# Or add www subdomain
railway domain add www.yourdomain.com
```

---

## Step 2: Configure DNS in Namecheap

### For Root Domain (e.g., alsama.ae)

1. **Login to Namecheap:**
   - Go to https://www.namecheap.com
   - Login to your account
   - Go to **Domain List**

2. **Access DNS Settings:**
   - Find your domain
   - Click **"Manage"** next to your domain
   - Go to **"Advanced DNS"** tab

3. **Add DNS Records:**

   **Option 1: Using CNAME (Recommended for subdomains)**
   
   If Railway provided a CNAME:
   - Click **"Add New Record"**
   - Select **CNAME Record**
   - **Host:** `@` (for root domain) or `www` (for www subdomain)
   - **Value:** `alsama-production.up.railway.app` (your Railway domain)
   - **TTL:** Automatic (or 3600)
   - Click **Save**

   **Option 2: Using A Record (For root domain)**
   
   If Railway provided an A record:
   - Click **"Add New Record"**
   - Select **A Record**
   - **Host:** `@`
   - **Value:** Railway's IP address (provided by Railway)
   - **TTL:** Automatic (or 3600)
   - Click **Save**

4. **Remove Default Records (if needed):**
   - Remove any existing A records pointing to Namecheap parking
   - Keep only the Railway records

### For WWW Subdomain

1. **Add CNAME Record:**
   - **Host:** `www`
   - **Value:** `alsama-production.up.railway.app`
   - **TTL:** Automatic
   - Click **Save**

### Example DNS Configuration

For domain `alsama.ae`:

```
Type    Host    Value                              TTL
CNAME   @       alsama-production.up.railway.app   Automatic
CNAME   www     alsama-production.up.railway.app   Automatic
```

Or if Railway provides A record:

```
Type    Host    Value                              TTL
A       @       76.76.21.21                        Automatic
CNAME   www     alsama-production.up.railway.app   Automatic
```

---

## Step 3: Update Environment Variables

After adding the domain, update Railway environment variables:

1. **In Railway Dashboard:**
   - Go to your service → **Variables** tab
   - Update `NEXTAUTH_URL`:
     - Old: `https://alsama-production.up.railway.app`
     - New: `https://yourdomain.com` (or `https://www.yourdomain.com`)

2. **Via Railway CLI:**
   ```bash
   railway variables set NEXTAUTH_URL="https://yourdomain.com"
   ```

3. **Railway will automatically redeploy** after variable change

---

## Step 4: Wait for DNS Propagation

DNS changes can take:
- **Minimum:** 5-15 minutes
- **Average:** 1-4 hours
- **Maximum:** 24-48 hours

### Check DNS Propagation:

```bash
# Check if DNS is propagated
nslookup yourdomain.com
# or
dig yourdomain.com

# Check CNAME
nslookup -type=CNAME yourdomain.com
```

Or use online tools:
- https://dnschecker.org
- https://www.whatsmydns.net

---

## Step 5: Verify SSL Certificate

Railway automatically provisions SSL certificates via Let's Encrypt:

1. **Wait for SSL:**
   - Railway will automatically request SSL certificate
   - Usually takes 5-10 minutes after DNS propagates

2. **Check SSL Status:**
   - Visit: https://yourdomain.com
   - Check for padlock icon in browser
   - Should show "Secure" connection

3. **If SSL fails:**
   - Wait a bit longer (up to 1 hour)
   - Check Railway logs for SSL errors
   - Verify DNS is fully propagated

---

## Step 6: Test Your Domain

1. **Test Root Domain:**
   - Visit: https://yourdomain.com
   - Should load your application

2. **Test WWW Subdomain (if configured):**
   - Visit: https://www.yourdomain.com
   - Should redirect or load application

3. **Test Admin Panel:**
   - Visit: https://yourdomain.com/admin/login
   - Should work correctly

---

## Troubleshooting

### Domain Not Resolving

**Problem:** Domain shows "Site can't be reached"

**Solutions:**
1. Verify DNS records are correct in Namecheap
2. Wait for DNS propagation (can take up to 48 hours)
3. Clear DNS cache:
   ```bash
   # macOS/Linux
   sudo dscacheutil -flushcache
   
   # Windows
   ipconfig /flushdns
   ```
4. Check DNS propagation: https://dnschecker.org

### SSL Certificate Not Working

**Problem:** Browser shows "Not Secure" or SSL error

**Solutions:**
1. Wait 10-30 minutes for Let's Encrypt to provision certificate
2. Verify domain is correctly configured in Railway
3. Check Railway logs for SSL errors
4. Ensure DNS is fully propagated
5. Try accessing via HTTP first, then HTTPS

### WWW Not Working

**Problem:** www.yourdomain.com doesn't work

**Solutions:**
1. Add CNAME record for `www` in Namecheap
2. Point `www` to Railway domain
3. Wait for DNS propagation

### Railway Shows "Pending" Status

**Problem:** Domain shows as "Pending" in Railway

**Solutions:**
1. Verify DNS records are correctly set
2. Wait for DNS propagation
3. Check that records match Railway's requirements
4. Remove conflicting DNS records

---

## Namecheap-Specific Settings

### Enable Advanced DNS

1. In Namecheap, go to your domain
2. Click **"Manage"**
3. Under **Nameservers**, ensure it's set to:
   - **Namecheap BasicDNS** (default)
   - Or **Custom DNS** if using external DNS

### Common Namecheap DNS Settings

**For Root Domain:**
- Use **A Record** if Railway provides IP
- Use **CNAME Record** if Railway provides domain

**For Subdomains:**
- Always use **CNAME Record**
- Point to Railway domain

### Namecheap DNS Record Types

- **A Record:** Points to IP address
- **CNAME Record:** Points to another domain
- **TXT Record:** For verification (if needed by Railway)

---

## Quick Reference Commands

```bash
# Check Railway domain status
railway domain

# Add domain via CLI
railway domain add yourdomain.com

# Update NEXTAUTH_URL
railway variables set NEXTAUTH_URL="https://yourdomain.com"

# Check DNS propagation
nslookup yourdomain.com
dig yourdomain.com

# View Railway logs
railway logs
```

---

## Step-by-Step Checklist

- [ ] Add domain in Railway dashboard
- [ ] Copy DNS records from Railway
- [ ] Login to Namecheap
- [ ] Go to Advanced DNS settings
- [ ] Add CNAME or A record for root domain
- [ ] Add CNAME record for www subdomain (optional)
- [ ] Remove conflicting DNS records
- [ ] Save DNS changes in Namecheap
- [ ] Update NEXTAUTH_URL in Railway
- [ ] Wait for DNS propagation (check with dnschecker.org)
- [ ] Verify domain loads correctly
- [ ] Check SSL certificate is active
- [ ] Test admin panel with new domain
- [ ] Update any hardcoded URLs in your application

---

## Example: Complete Setup for `alsama.ae`

### 1. Railway Dashboard:
- Add domain: `alsama.ae`
- Railway shows: CNAME to `alsama-production.up.railway.app`

### 2. Namecheap DNS:
```
Host: @
Type: CNAME
Value: alsama-production.up.railway.app
TTL: Automatic

Host: www
Type: CNAME
Value: alsama-production.up.railway.app
TTL: Automatic
```

### 3. Railway Variables:
```
NEXTAUTH_URL=https://alsama.ae
```

### 4. Wait and Test:
- Wait 15-60 minutes for DNS
- Visit: https://alsama.ae
- Should load your application!

---

## Support

- **Railway Docs:** https://docs.railway.app/deploy/domains
- **Namecheap Help:** https://www.namecheap.com/support/
- **Railway Status:** https://status.railway.app

---

**Last Updated:** 2024-02-07
