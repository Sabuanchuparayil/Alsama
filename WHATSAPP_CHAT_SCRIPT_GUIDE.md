# WhatsApp Chat Script Management Guide

## Overview

You can now manage the WhatsApp chat message (script) that appears when customers click the floating WhatsApp chat button. This message is pre-filled in the WhatsApp conversation when users click the button.

---

## How to Update WhatsApp Chat Message

### Step 1: Access Admin Settings

1. **Login to Admin Panel:**
   - Go to: `https://www.alsamatourism.com/admin/login`
   - Login with your admin credentials

2. **Navigate to Contact Settings:**
   - In the left sidebar, scroll to **"Settings"** section
   - Click on **"📞 Contact Info"**

### Step 2: Update Chat Message

1. **Find the "WhatsApp Chat Message" field:**
   - It's the 4th field in the form (after WhatsApp Number, before Address)
   - It's a textarea field

2. **Enter your message:**
   - Type the message you want customers to see when they click WhatsApp
   - Example: `Hello! I would like to inquire about your luxury chauffeur services.`
   - Example: `Hi AL SAMA! I'm interested in booking a vehicle.`
   - Example: `Hello, I need information about your services.`

3. **Click "Save Contact Information"**

4. **Changes take effect:**
   - Updates appear on the website within 30 seconds
   - The floating chat button will use the new message

---

## What Happens When Customers Click Chat

1. Customer clicks the floating WhatsApp button (bottom-right)
2. WhatsApp opens (web or app)
3. Your WhatsApp number is pre-filled
4. **The chat message you configured is automatically inserted**
5. Customer can edit the message before sending or send as-is

---

## Best Practices for Chat Messages

### ✅ Good Examples

- **Friendly & Clear:**
  ```
  Hello! I would like to inquire about your luxury chauffeur services.
  ```

- **Specific:**
  ```
  Hi AL SAMA! I'm interested in booking a luxury vehicle for [date].
  ```

- **Professional:**
  ```
  Good day! I would like to discuss your premium transportation services.
  ```

### ❌ Avoid

- Too long messages (keep under 200 characters)
- Special characters that might break WhatsApp links
- Messages that are too generic

---

## Current Configuration

**Location:** `/admin/settings/contact`

**Fields:**
1. Email Address
2. Phone Number
3. WhatsApp Number
4. **WhatsApp Chat Message** ← This is what you manage
5. Address

---

## Technical Details

### How It Works

1. **Admin updates message** in `/admin/settings/contact`
2. **Message is saved** to database via `/api/cms/site-settings`
3. **WhatsAppChat component** fetches message from API
4. **When user clicks button**, message is URL-encoded and added to WhatsApp link
5. **WhatsApp opens** with pre-filled message

### API Endpoint

- **GET:** `/api/cms/site-settings` - Returns contact info including `whatsappMessage`
- **PUT:** `/api/cms/site-settings` - Updates contact info (admin only)

### Default Message

If no message is configured, the default is:
```
Hello! I would like to inquire about your luxury chauffeur services.
```

---

## Troubleshooting

### Message Not Updating

1. **Wait 30 seconds** - Changes take time to propagate
2. **Hard refresh** the website: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
3. **Clear browser cache**
4. **Check admin settings** - Verify message was saved

### Message Not Appearing in WhatsApp

1. **Check message format** - Avoid special characters
2. **Test the link** - Click the chat button and verify
3. **Check WhatsApp number** - Ensure it's correct
4. **Try different browser** - Some browsers handle WhatsApp links differently

### Message Too Long

- WhatsApp has a character limit for pre-filled messages
- Keep messages under 200 characters for best results
- Long messages might be truncated

---

## Quick Access

**Direct URL:**
```
https://www.alsamatourism.com/admin/settings/contact
```

**Navigation:**
```
Admin Panel → Settings (sidebar) → Contact Info
```

---

## Example Messages

### For General Inquiries
```
Hello! I would like to inquire about your luxury chauffeur services.
```

### For Bookings
```
Hi AL SAMA! I'm interested in booking a vehicle. Please provide more information.
```

### For Corporate Services
```
Good day! I would like to discuss corporate transportation services for our company.
```

### For Airport Transfers
```
Hello! I need information about your airport transfer services.
```

---

**Note:** The chat message is the pre-filled text that appears when customers click the WhatsApp button. They can edit it before sending, but having a good default message improves user experience and conversion rates.
