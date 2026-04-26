# 🚨 URGENT: Fix OAuth 401 Error - Invalid Client

## ❌ Current Problem

```
Error 401: invalid_client
The OAuth client was not found.
```

**Reason:** Your `.env.local` has FAKE credentials:
- ❌ `GOOGLE_CLIENT_ID=demo-google-id.apps.googleusercontent.com`
- ❌ `GOOGLE_CLIENT_SECRET=demo-google-secret`

Google doesn't recognize these, so it rejects the login.

---

## ✅ SOLUTION: Get Real Google OAuth Credentials

### Step 1: Go to Google Cloud Console
https://console.cloud.google.com/

### Step 2: Create a New Project
1. Click the **project selector** at the top (showing "Select a Project")
2. Click **NEW PROJECT**
3. Enter:
   - **Project name:** `car-doctor`
   - Leave organization as default
4. Click **CREATE**
5. Wait 1-2 minutes for creation to complete
6. Select the new project

### Step 3: Enable OAuth2
1. Go to **APIs & Services** (left sidebar)
2. Click **OAuth consent screen**
3. Select **External**
4. Click **CREATE**

### Step 4: Configure Consent Screen
Fill in the form:

**App information:**
- **App name:** `Car Doctor`
- **User support email:** `tamim22160334@gmail.com` (your email)

**Developer contact information:**
- **Email addresses:** `tamim22160334@gmail.com` (your email)

Click **SAVE AND CONTINUE**

### Step 5: Add Scopes (Skip This)
- Click **SAVE AND CONTINUE** again (no need to add scopes for now)

### Step 6: Add Test Users (Skip This)
- Click **SAVE AND CONTINUE** (no test users needed)

### Step 7: Create OAuth Client ID
1. Go to **Credentials** tab (left sidebar)
2. Click **CREATE CREDENTIALS** → **OAuth 2.0 Client ID**
3. If prompted: Select **Web application**

### Step 8: Configure Redirect URI
1. Under **Authorized redirect URIs**, click **ADD URI**
2. Paste exactly:
   ```
   http://localhost:3001/api/auth/callback/google
   ```
3. Click **CREATE**

### Step 9: Copy Your Credentials
You should now see a popup with your credentials. **Copy these exactly:**
- **Client ID** - looks like: `123456789-abcdefghijk.apps.googleusercontent.com`
- **Client Secret** - looks like: `GOCSPX-abcdefghijklmnop`

---

## 🔧 Update .env.local

Replace the fake credentials with your real ones:

```env
# Before (WRONG - FAKE):
GOOGLE_CLIENT_ID=demo-google-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=demo-google-secret

# After (CORRECT - REAL):
GOOGLE_CLIENT_ID=123456789-abcdefghijk.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abcdefghijklmnop
```

**Example of what real credentials look like:**
```env
GOOGLE_CLIENT_ID=912345678901-a1b2c3d4e5f6g7h8i9j0.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-a1b2c3d4e5f6g7h8i9j0
```

---

## 🚀 Final Steps

1. **Copy your real credentials** from Google Cloud Console
2. **Update `.env.local`** with real values
3. **Save the file**
4. **Restart dev server:**
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```
5. **Clear browser cache** (Ctrl+Shift+Delete) or use **Incognito Mode**
6. **Go to** http://localhost:3001/login
7. **Click Google button** - It should work now! ✅

---

## ⚠️ Common Mistakes to Avoid

❌ **DON'T:** Use demo/fake credentials
❌ **DON'T:** Miss the `http://localhost:3001/` part in redirect URI
❌ **DON'T:** Forget to save `.env.local`
❌ **DON'T:** Keep old browser cache (use Incognito Mode)

✅ **DO:** Copy credentials exactly (including `-` and case sensitivity)
✅ **DO:** Restart dev server after updating `.env.local`
✅ **DO:** Use exact redirect URI: `http://localhost:3001/api/auth/callback/google`

---

## 📸 Visual Guide

Your `.env.local` file should look like:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=a7f8e2b3c9d1a4e6f2b8c3d9e1a5f7b9c2d4e6f8a9b1c3d5e7f9a1b3c5d7e9

# MongoDB Connection
MONGODB_URI=your-mongodb-connection-string

# Google OAuth Credentials (REAL - from Google Cloud Console)
GOOGLE_CLIENT_ID=912345678901-a1b2c3d4e5f6g7h8i9j0.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-a1b2c3d4e5f6g7h8i9j0

# GitHub OAuth Credentials
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Public Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3001
```

---

## ✅ You're Done!

Once you update with real credentials and restart:
- ✅ Error will be fixed
- ✅ Google login will work
- ✅ User automatically created in MongoDB
- ✅ You'll be logged in!

---

## 🆘 Still Getting Error?

If you still get "invalid_client":
1. **Double-check credentials** - Are they exactly as shown in Google Cloud Console?
2. **Check redirect URI** - Must be exactly `http://localhost:3001/api/auth/callback/google`
3. **Restart server** - Stop and run `npm run dev` again
4. **Clear cache** - Use Incognito Mode
5. **Check browser console** - Press F12 for error details
