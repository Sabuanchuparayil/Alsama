# Domain Activation Troubleshooting - www.alsamatourism.com

## Current Status: "Waiting for DNS update"

If Railway shows "Waiting for DNS update" for `www.alsamatourism.com`, here's how to resolve it.

---

## Step 1: Verify DNS Records Are Correct

### Check CNAME Record

**Railway Requires:**
- Host: `www`
- Value: `96fd4xza.up.railway.app`

**Verify in Namecheap:**
1. Go to Namecheap → Domain List → alsamatourism.com
2. Click "Manage" → "Advanced DNS"
3. Check CNAME record for `www`:
   - ✅ Should point to: `96fd4xza.up.railway.app.` (with trailing dot is OK)
   - ❌ Should NOT point to: `alsama-production.up.railway.app`

### Check TXT Verification Record

**Railway Requires:**
- Host: `_railway-verify.www.alsamatourism.com` (full domain)
- Value: `railway-verify=4b8aa2c3bc1d68491776ff6...`

**Verify in Namecheap:**
1. Check TXT record:
   - ✅ Host should be: `_railway-verify.www` (Namecheap auto-adds domain)
   - ✅ Value should start with: `railway-verify=`

---

## Step 2: Check DNS Propagation

### Test CNAME Record

Visit: https://dnschecker.org/#CNAME/www.alsamatourism.com

**Expected Result:**
- Should show `96fd4xza.up.railway.app` in most locations
- If showing different values or errors, DNS hasn't propagated

**If Not Propagated:**
- Wait 15-30 minutes
- Clear your DNS cache:
  ```bash
  # macOS
  sudo dscacheutil -flushcache
  
  # Windows
  ipconfig /flushdns
  
  # Linux
  sudo systemd-resolve --flush-caches
  ```

### Test TXT Record

Visit: https://dnschecker.org/#TXT/_railway-verify.www.alsamatourism.com

**Expected Result:**
- Should show the `railway-verify=...` value
- Should appear in most locations

---

## Step 3: Common Issues and Fixes

### Issue 1: Wrong CNAME Value

**Symptom:** CNAME points to wrong domain

**Fix:**
1. In Namecheap, edit the CNAME record
2. Change value to: `96fd4xza.up.railway.app.`
3. Save and wait 15-30 minutes

### Issue 2: Missing TXT Record

**Symptom:** TXT verification record doesn't exist

**Fix:**
1. In Namecheap → Advanced DNS
2. Click "Add New Record"
3. Type: TXT Record
4. Host: `_railway-verify.www`
5. Value: `railway-verify=4b8aa2c3bc1d68491776ff66b2419456...` (full value from Railway)
6. TTL: Automatic
7. Save

### Issue 3: TXT Record Host Format

**Symptom:** TXT record exists but Railway doesn't recognize it

**Fix:**
- Ensure host is: `_railway-verify.www` (Namecheap will auto-complete to full domain)
- Or use full domain: `_railway-verify.www.alsamatourism.com`

### Issue 4: Duplicate Records

**Symptom:** Multiple CNAME or TXT records

**Fix:**
1. Delete all duplicate records
2. Keep only ONE CNAME for `www`
3. Keep only ONE TXT for `_railway-verify.www`

### Issue 5: DNS Not Propagated

**Symptom:** Records are correct but not showing globally

**Fix:**
- Wait 15-30 minutes (can take up to 48 hours)
- Check propagation: https://dnschecker.org
- Clear local DNS cache

---

## Step 4: Verify Railway Configuration

### Check Domain in Railway

1. Railway Dashboard → Service → Settings → Domains
2. Verify `www.alsamatourism.com` is listed
3. Check status:
   - "Active" = ✅ Working
   - "Waiting for DNS update" = ⏳ DNS not verified yet
   - "Invalid" = ❌ DNS misconfigured

### Check Railway Logs

1. Railway Dashboard → Service → Logs
2. Look for domain-related errors
3. Check for SSL certificate errors

---

## Step 5: Manual DNS Verification

### Using Command Line

```bash
# Check CNAME
dig www.alsamatourism.com CNAME +short
# Should return: 96fd4xza.up.railway.app.

# Check TXT
dig _railway-verify.www.alsamatourism.com TXT +short
# Should return: "railway-verify=4b8aa2c3bc1d68491776ff66b2419456..."
```

### Using Online Tools

1. **DNS Checker:** https://dnschecker.org
   - Check CNAME: https://dnschecker.org/#CNAME/www.alsamatourism.com
   - Check TXT: https://dnschecker.org/#TXT/_railway-verify.www.alsamatourism.com

2. **MXToolbox:** https://mxtoolbox.com
   - Enter: `www.alsamatourism.com`
   - Check CNAME record

---

## Step 6: Force Railway to Re-check

### Option 1: Remove and Re-add Domain

1. Railway Dashboard → Service → Settings → Domains
2. Click "Delete" next to `www.alsamatourism.com`
3. Wait 1 minute
4. Click "Add Custom Domain"
5. Enter: `www.alsamatourism.com`
6. Railway will re-verify DNS

### Option 2: Contact Railway Support

If DNS is correct but Railway still shows "Waiting":
1. Railway Dashboard → Help → Support
2. Provide:
   - Domain: `www.alsamatourism.com`
   - DNS records screenshot
   - DNS propagation checker results

---

## Step 7: Verify Exact DNS Configuration

### Required DNS Records (Exact)

```
Type    Host                    Value                                    TTL
CNAME   www                     96fd4xza.up.railway.app.                Automatic
TXT     _railway-verify.www     railway-verify=4b8aa2c3bc1d6849...     Automatic
```

### Namecheap Configuration

1. **CNAME Record:**
   - Type: CNAME Record
   - Host: `www`
   - Value: `96fd4xza.up.railway.app.` (trailing dot is OK)
   - TTL: Automatic or 30 min

2. **TXT Record:**
   - Type: TXT Record
   - Host: `_railway-verify.www`
   - Value: `railway-verify=4b8aa2c3bc1d68491776ff66b2419456...` (full value)
   - TTL: Automatic

---

## Step 8: Timeline Expectations

- **DNS Propagation:** 15-30 minutes (usually)
- **Railway Verification:** 5-10 minutes after DNS resolves
- **SSL Certificate:** 5-10 minutes after verification
- **Total:** Usually 30-60 minutes from DNS update

**If longer than 2 hours:**
- Check DNS records are correct
- Verify DNS has propagated globally
- Contact Railway support if needed

---

## Quick Diagnostic Checklist

- [ ] CNAME record exists for `www`
- [ ] CNAME points to `96fd4xza.up.railway.app`
- [ ] TXT record exists for `_railway-verify.www`
- [ ] TXT value starts with `railway-verify=`
- [ ] No duplicate CNAME records
- [ ] No duplicate TXT records
- [ ] DNS propagated (check dnschecker.org)
- [ ] Domain added in Railway
- [ ] Waited 30+ minutes after DNS update
- [ ] Cleared local DNS cache

---

## Still Not Working?

### Final Steps

1. **Double-check DNS in Namecheap:**
   - Take screenshot of DNS records
   - Verify exact values match Railway requirements

2. **Verify DNS Propagation:**
   - Use https://dnschecker.org
   - Check multiple locations
   - Should show correct values in 80%+ locations

3. **Check Railway Logs:**
   - Look for domain verification errors
   - Check SSL certificate errors

4. **Remove and Re-add Domain:**
   - Delete domain in Railway
   - Wait 5 minutes
   - Re-add domain
   - Railway will re-verify

5. **Contact Railway Support:**
   - Provide DNS records
   - Provide propagation checker results
   - Explain issue clearly

---

## Expected Resolution

After DNS is correct and propagated:
1. Railway will verify DNS records (5-10 minutes)
2. Railway will issue SSL certificate (5-10 minutes)
3. Domain status will change to "Active"
4. Domain will be accessible at `https://www.alsamatourism.com`

---

## Common Mistakes to Avoid

❌ **Wrong CNAME value:** Using `alsama-production.up.railway.app` instead of `96fd4xza.up.railway.app`
❌ **Missing TXT record:** Not adding the verification TXT record
❌ **Wrong TXT host:** Using `_railway-verify` instead of `_railway-verify.www`
❌ **Duplicate records:** Having multiple CNAME or TXT records
❌ **Not waiting:** Expecting immediate activation (needs 15-30 minutes minimum)

---

**Next Steps:**
1. Verify DNS records match exactly
2. Check DNS propagation
3. Wait 30 minutes
4. Check Railway dashboard for status change
5. If still not active, remove and re-add domain
