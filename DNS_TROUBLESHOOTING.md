# DNS Troubleshooting Guide - alsamatourism.com

## Error: DNS_PROBE_FINISHED_NXDOMAIN

This error means the domain `alsamatourism.com` is not resolving. The DNS records are either:
- Not configured correctly
- Not propagated yet
- Not pointing to Railway

---

## Step-by-Step Fix

### Step 1: Verify Domain is Added in Railway

1. **Check Railway Dashboard:**
   - Go to: https://railway.com/project/fcb2fbb9-67f1-48be-b96b-c8c53c2939d1
   - Click on your **Alsama** service
   - Go to **Settings** → **Domains**
   - Check if `alsamatourism.com` is listed

2. **If NOT added:**
   - Click **"Add Custom Domain"**
   - Enter: `alsamatourism.com`
   - Railway will show you the DNS records to add

3. **If already added:**
   - Note the DNS records Railway shows
   - Usually a CNAME pointing to `alsama-production.up.railway.app`

### Step 2: Configure DNS in Namecheap

1. **Login to Namecheap:**
   - Go to: https://www.namecheap.com
   - Login to your account
   - Go to **Domain List**

2. **Find Your Domain:**
   - Search for `alsamatourism.com`
   - Click **"Manage"** next to it

3. **Go to Advanced DNS:**
   - Click on **"Advanced DNS"** tab
   - You should see existing DNS records

4. **Add/Update DNS Records:**

   **For Root Domain (alsamatourism.com):**
   
   - Click **"Add New Record"**
   - Select **CNAME Record**
   - **Host:** `@` (this represents the root domain)
   - **Value:** `alsama-production.up.railway.app` (your Railway domain)
   - **TTL:** Automatic (or 3600)
   - Click **Save** (green checkmark)

   **For WWW Subdomain (www.alsamatourism.com):**
   
   - Click **"Add New Record"** again
   - Select **CNAME Record**
   - **Host:** `www`
   - **Value:** `alsama-production.up.railway.app`
   - **TTL:** Automatic
   - Click **Save**

5. **Remove Conflicting Records:**
   - Look for any existing A records pointing to Namecheap parking (usually `192.64.119.119` or similar)
   - Delete those records (click the trash icon)
   - Keep only the Railway CNAME records

### Step 3: Verify DNS Records

Your Namecheap DNS should look like this:

```
Type    Host    Value                              TTL
CNAME   @       alsama-production.up.railway.app   Automatic
CNAME   www     alsama-production.up.railway.app   Automatic
```

**Important Notes:**
- The `@` symbol represents the root domain
- Make sure there are NO conflicting A records for `@`
- The value should be exactly `alsama-production.up.railway.app` (no trailing slash)

### Step 4: Wait for DNS Propagation

DNS changes can take:
- **Minimum:** 5-15 minutes
- **Average:** 1-4 hours
- **Maximum:** 24-48 hours

**Check DNS Propagation:**
- Visit: https://dnschecker.org/#CNAME/alsamatourism.com
- Or: https://www.whatsmydns.net/#CNAME/alsamatourism.com
- Enter: `alsamatourism.com`
- Check if it resolves to `alsama-production.up.railway.app`

### Step 5: Update Railway Environment Variable

After DNS is configured, update NEXTAUTH_URL:

```bash
railway variables set NEXTAUTH_URL="https://alsamatourism.com"
```

Or via Railway Dashboard:
- Service → Variables → Update `NEXTAUTH_URL` to `https://alsamatourism.com`

---

## Common Issues and Solutions

### Issue 1: Domain Not Added in Railway

**Symptom:** Domain doesn't appear in Railway domains list

**Solution:**
1. Go to Railway Dashboard
2. Service → Settings → Domains
3. Click "Add Custom Domain"
4. Enter `alsamatourism.com`
5. Follow DNS instructions

### Issue 2: Wrong DNS Record Type

**Symptom:** Using A record instead of CNAME

**Solution:**
- Use **CNAME** record, not A record
- Point to `alsama-production.up.railway.app`
- Remove any A records for `@`

### Issue 3: Conflicting DNS Records

**Symptom:** Multiple records pointing to different places

**Solution:**
- Remove all A records for `@` (root domain)
- Keep only the CNAME record pointing to Railway
- Remove Namecheap parking records

### Issue 4: DNS Not Propagated

**Symptom:** DNS checker shows different results in different locations

**Solution:**
- Wait longer (up to 48 hours)
- Clear your DNS cache:
  ```bash
  # macOS
  sudo dscacheutil -flushcache
  
  # Windows
  ipconfig /flushdns
  
  # Linux
  sudo systemd-resolve --flush-caches
  ```

### Issue 5: Namecheap Nameservers

**Symptom:** Domain not resolving at all

**Solution:**
- In Namecheap, go to domain settings
- Under **Nameservers**, ensure it's set to:
  - **Namecheap BasicDNS** (default)
  - NOT custom nameservers unless you're using external DNS

---

## Verification Steps

### 1. Check DNS Records in Namecheap

✅ Go to Advanced DNS
✅ Verify CNAME record exists for `@`
✅ Verify value is `alsama-production.up.railway.app`
✅ No conflicting A records

### 2. Check DNS Propagation

✅ Visit: https://dnschecker.org/#CNAME/alsamatourism.com
✅ Should show `alsama-production.up.railway.app` in most locations
✅ Wait if not all locations show correct value

### 3. Check Railway Configuration

✅ Domain added in Railway dashboard
✅ Shows as "Active" or "Pending"
✅ NEXTAUTH_URL updated to `https://alsamatourism.com`

### 4. Test Domain

✅ Visit: https://alsamatourism.com
✅ Should load your application
✅ SSL certificate should be active (padlock icon)

---

## Quick Fix Checklist

- [ ] Domain added in Railway dashboard
- [ ] CNAME record added in Namecheap for `@`
- [ ] CNAME record added in Namecheap for `www` (optional)
- [ ] Conflicting A records removed
- [ ] DNS records saved in Namecheap
- [ ] NEXTAUTH_URL updated in Railway
- [ ] Waited 15-60 minutes for DNS propagation
- [ ] Checked DNS propagation with dnschecker.org
- [ ] Cleared local DNS cache
- [ ] Tested domain in browser

---

## Still Not Working?

1. **Double-check DNS records:**
   - Host: `@` (not empty, not `alsamatourism.com`)
   - Value: `alsama-production.up.railway.app` (exact match)
   - Type: CNAME (not A record)

2. **Contact Railway Support:**
   - Check Railway logs for domain errors
   - Railway Dashboard → Service → Deployments → View Logs

3. **Contact Namecheap Support:**
   - If DNS records aren't saving
   - If nameservers are incorrect

---

## Expected Timeline

- **DNS Configuration:** 5 minutes
- **DNS Propagation:** 15 minutes to 4 hours
- **SSL Certificate:** 5-10 minutes after DNS resolves
- **Total:** Usually 30 minutes to 1 hour

---

**Last Updated:** 2024-02-07
