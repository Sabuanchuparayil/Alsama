# DNS Configuration Cleanup - alsamatourism.com

## Current Issues Found

### ❌ Problem 1: Duplicate CNAME Records for `www`
You have **TWO** CNAME records for `www` pointing to different values:
- `www` → `96fd4xza.up.railway.app.` ✅ (CORRECT - matches Railway)
- `www` → `alsama-production.up.railway.app.` ❌ (WRONG - delete this)

**DNS Rule:** A host can only have ONE CNAME record. Having two causes conflicts.

### ❌ Problem 2: Conflicting Root Domain Records
You have both:
- CNAME `@` → `alsama-production.up.railway.app.`
- URL Redirect `@` → `http://www.alsamatourism.com`

**Issue:** Root domain (`@`) cannot have both CNAME and URL Redirect. Choose one.

### ✅ Correct Records (Keep These)
- `www` CNAME → `96fd4xza.up.railway.app.` ✅
- `_railway-verify.www` TXT → `railway-verify=4b8aa2c3bc1d68491776ff6...` ✅

---

## Required DNS Configuration

Based on Railway's requirements, here's what your DNS should look like:

### For `www.alsamatourism.com` (Required by Railway)

**Record 1: CNAME**
- **Type:** CNAME Record
- **Host:** `www`
- **Value:** `96fd4xza.up.railway.app.` (note the trailing dot)
- **TTL:** Automatic or 30 min

**Record 2: TXT (Verification)**
- **Type:** TXT Record
- **Host:** `_railway-verify.www`
- **Value:** `railway-verify=4b8aa2c3bc1d68491776ff66b2419456...` (full value from Railway)
- **TTL:** Automatic

### For Root Domain `alsamatourism.com` (Optional)

**Option A: Redirect to www (Recommended)**
- **Type:** URL Redirect Record
- **Host:** `@`
- **Value:** `http://www.alsamatourism.com` (Unmasked)
- **TTL:** Automatic

**Option B: Point directly to Railway**
- **Type:** CNAME Record
- **Host:** `@`
- **Value:** `96fd4xza.up.railway.app.`
- **TTL:** Automatic
- **Note:** Remove URL Redirect if using this

---

## Step-by-Step Cleanup Instructions

### Step 1: Delete Duplicate/Conflicting Records

In Namecheap Advanced DNS, **DELETE** these records:

1. ❌ **Delete:** CNAME `www` → `alsama-production.up.railway.app.`
   - This is the duplicate/incorrect one
   - Keep the one pointing to `96fd4xza.up.railway.app.`

2. ❌ **Delete:** CNAME `@` → `alsama-production.up.railway.app.`
   - This conflicts with URL Redirect
   - Choose either CNAME or URL Redirect, not both

### Step 2: Verify Correct Records

**Keep these records:**

1. ✅ **Keep:** CNAME `www` → `96fd4xza.up.railway.app.`
   - This matches Railway's requirement

2. ✅ **Keep:** TXT `_railway-verify.www` → `railway-verify=...`
   - This is for Railway domain verification

3. ✅ **Keep:** URL Redirect `@` → `http://www.alsamatourism.com`
   - This redirects root domain to www
   - OR replace with CNAME if you want root domain to work directly

### Step 3: Final DNS Configuration

After cleanup, you should have:

```
Type          Host                    Value                                    TTL
CNAME         www                     96fd4xza.up.railway.app.                Automatic
TXT           _railway-verify.www     railway-verify=4b8aa2c3bc1d6849...      Automatic
URL Redirect  @                      http://www.alsamatourism.com            Automatic
```

**OR** if you want root domain to work directly:

```
Type          Host                    Value                                    TTL
CNAME         www                     96fd4xza.up.railway.app.                Automatic
CNAME         @                       96fd4xza.up.railway.app.                Automatic
TXT           _railway-verify.www     railway-verify=4b8aa2c3bc1d6849...      Automatic
```

---

## How to Delete Records in Namecheap

1. Go to Namecheap → Domain List → alsamatourism.com
2. Click "Manage" → "Advanced DNS"
3. Find the record you want to delete
4. Click the **trash can icon** (🗑️) on the right
5. Confirm deletion
6. Repeat for all conflicting records

---

## Verification Checklist

After cleanup:

- [ ] Only ONE CNAME record for `www` exists
- [ ] `www` CNAME points to `96fd4xza.up.railway.app.`
- [ ] TXT record `_railway-verify.www` exists
- [ ] No duplicate CNAME records
- [ ] Root domain has either CNAME OR URL Redirect (not both)
- [ ] All records saved in Namecheap

---

## After Cleanup

1. **Wait 15-30 minutes** for DNS to propagate
2. **Check Railway Dashboard:**
   - `www.alsamatourism.com` should change from "Waiting for DNS update" to "Active"
3. **Test the domain:**
   - Visit: `https://www.alsamatourism.com`
   - Should load your application

---

## Why This Matters

- **Duplicate CNAME records** cause DNS resolution failures
- **Conflicting record types** (CNAME + URL Redirect) confuse DNS servers
- **Wrong CNAME values** point to wrong servers
- Railway needs the **exact** CNAME value it provides (`96fd4xza.up.railway.app`)

---

## Still Having Issues?

1. **Check DNS Propagation:**
   - Visit: https://dnschecker.org/#CNAME/www.alsamatourism.com
   - Should show `96fd4xza.up.railway.app` in most locations

2. **Clear DNS Cache:**
   ```bash
   # macOS
   sudo dscacheutil -flushcache
   
   # Windows
   ipconfig /flushdns
   ```

3. **Check Railway Logs:**
   - Railway Dashboard → Service → Logs
   - Look for domain verification errors
