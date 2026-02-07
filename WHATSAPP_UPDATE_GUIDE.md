# How to Update WhatsApp Number

## Location: Admin Settings → Contact Info

The WhatsApp number can be updated in the **Contact Information Settings** page.

### Step-by-Step Instructions

1. **Login to Admin Panel:**
   - Go to: `https://www.alsamatourism.com/admin/login`
   - Login with your admin credentials

2. **Navigate to Settings:**
   - In the left sidebar, scroll down to the **"Settings"** section
   - Click on **"📞 Contact Info"**

3. **Update WhatsApp Number:**
   - You'll see a form with 4 fields:
     - Email Address
     - Phone Number
     - **WhatsApp Number** ← This is the field you need
     - Address
   - Enter your WhatsApp number in the "WhatsApp Number" field
   - Format: `+[country code][number]` (e.g., `+971501234567`)
   - Click **"Save Contact Information"**

4. **Verify Update:**
   - The WhatsApp floating chat button on the website will use this number
   - Changes appear within 30 seconds (due to auto-refresh)

---

## Direct URL

You can also access the page directly:
```
https://www.alsamatourism.com/admin/settings/contact
```

---

## WhatsApp Number Format

**Required Format:**
- Include country code with `+` sign
- No spaces (or spaces are OK, they'll be removed automatically)
- Example: `+971501234567`
- Example: `+971 50 123 4567` (spaces are fine)

**Where It's Used:**
- Floating WhatsApp chat button (bottom-right of website)
- Contact page WhatsApp section
- Footer (if configured)

---

## Troubleshooting

### Can't See "Settings" Section in Sidebar

1. **Scroll down** in the left sidebar - Settings is at the bottom
2. **Check if you're logged in** as admin
3. **Refresh the page** if sidebar doesn't load

### WhatsApp Number Not Updating

1. **Check the format** - must include country code (e.g., +971)
2. **Wait 30 seconds** - changes take a moment to appear
3. **Hard refresh** the website: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
4. **Clear browser cache** if still not updating

### Field Not Visible

If the WhatsApp field is not showing:
1. Check browser console for errors (F12 → Console)
2. Try a different browser
3. Clear browser cache and cookies
4. Contact support if issue persists

---

## Current WhatsApp Configuration

The WhatsApp number is stored in the database and can be updated through:
- **Admin Panel:** `/admin/settings/contact`
- **API:** `PUT /api/cms/site-settings`

---

## Quick Access

**Direct Link:**
```
https://www.alsamatourism.com/admin/settings/contact
```

**Navigation Path:**
```
Admin Panel → Settings (sidebar) → Contact Info
```

---

**Note:** The WhatsApp number field is the third field in the Contact Information Settings form, right after "Phone Number" and before "Address".
