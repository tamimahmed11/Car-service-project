# 🚗 Car Doctor - Google & GitHub OAuth Setup

## ⚠️ Current Issue
Your `.env.local` file still has **placeholder values**. The OAuth buttons are working fine, but they need real credentials to function.

---

## ✅ Step-by-Step Setup

### 1️⃣ Generate NEXTAUTH_SECRET
Run this command in your terminal (in the project folder):

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and replace `NEXTAUTH_SECRET=your-generated-secret-here` with it.

**Example result:**
```
NEXTAUTH_SECRET=a7f8e2b3c9d1a4e6f2b8c3d9e1a5f7b9c2d4e6f8a9b1c3d5e7f9a1b3c5d7e9
```

---

### 2️⃣ Get Google OAuth Credentials

1. Go to **[Google Cloud Console](https://console.cloud.google.com/)**
2. Click **"Select a Project"** → **"NEW PROJECT"**
3. Enter project name: `car-doctor` → **Create**
4. Wait for project to be created, then go to **APIs & Services**
5. Click **OAuth consent screen** → Select **External** → **Create**
6. Fill in the form:
   - App name: `Car Doctor`
   - User support email: Your email
   - Developer contact: Your email
   - Click **Save and Continue**
7. Skip the scopes and continue to the end
8. Go to **Credentials** tab → **Create Credentials** → **OAuth 2.0 Client ID**
9. Select **Web application**
10. Under **Authorized redirect URIs**, click **ADD URI** and paste:
    ```
    http://localhost:3000/api/auth/callback/google
    ```
11. Click **Create**
12. Copy the **Client ID** and **Client Secret**
13. Update `.env.local`:
    ```env
    GOOGLE_CLIENT_ID=paste-client-id-here
    GOOGLE_CLIENT_SECRET=paste-client-secret-here
    ```

---

### 3️⃣ Get GitHub OAuth Credentials

1. Go to **[GitHub Settings → Developer settings](https://github.com/settings/developers)**
2. Click **OAuth Apps** (on the left) → **New OAuth App**
3. Fill in the form:
   - **Application name:** `Car Doctor`
   - **Homepage URL:** `http://localhost:3000`
   - **Authorization callback URL:** `http://localhost:3000/api/auth/callback/github`
4. Click **Register application**
5. You'll see your **Client ID**
6. Click **Generate a new client secret**
7. Copy both Client ID and Client Secret
8. Update `.env.local`:
    ```env
    GITHUB_CLIENT_ID=paste-client-id-here
    GITHUB_CLIENT_SECRET=paste-client-secret-here
    ```

---

### 4️⃣ Update MongoDB (Optional but recommended)

If using MongoDB:
1. Go to **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)**
2. Create a cluster or use existing one
3. Click **Connect** → **Drivers**
4. Copy the connection string
5. Replace the username, password, and database name
6. Update `.env.local`:
    ```env
    MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/car-doctor
    ```

---

## 📝 Complete .env.local Example

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=a7f8e2b3c9d1a4e6f2b8c3d9e1a5f7b9c2d4e6f8a9b1c3d5e7f9a1b3c5d7e9

MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/car-doctor

GOOGLE_CLIENT_ID=123456789-abc123def456.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abc123def456xyz789

GITHUB_CLIENT_ID=abc123def456
GITHUB_CLIENT_SECRET=gho_abc123def456xyz789

NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## 🚀 Final Steps

1. **Save `.env.local`** with your real credentials
2. **Restart your dev server:**
   ```bash
   npm run dev
   ```
3. **Clear browser cache** (Ctrl+Shift+Delete) or use **Incognito Mode**
4. Go to **http://localhost:3000/login**
5. Click the **Google** or **GitHub** buttons
6. You should see the login flow!

---

## ✨ What's Fixed

✅ **Icons now always show** - Even if OAuth isn't configured, you'll see the icons  
✅ **Better error messages** - Shows alerts if something goes wrong  
✅ **Bigger icons** - Increased from default size to 24px  
✅ **Improved buttons** - Circle buttons with better styling  
✅ **Loading states** - Spinner shows while logging in  

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| **"Redirect URI mismatch" error** | Make sure the callback URLs in OAuth apps **exactly match** your `.env.local` URLs |
| **Icons still not showing** | Clear browser cache, restart dev server, try incognito mode |
| **Buttons don't respond** | Check browser console (F12) for errors, verify credentials are real (not placeholder text) |
| **User not created in database** | Verify `MONGODB_URI` is correct and database is running |
| **"Invalid client_id"** | Make sure you copied the credentials correctly with no extra spaces |

---

## 📚 Useful Links

- [NextAuth.js Docs](https://next-auth.js.org/)
- [Google OAuth Setup](https://developers.google.com/identity/protocols/oauth2)
- [GitHub OAuth Setup](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

**Need help?** Follow the steps above exactly. If you still have issues, check the browser console (F12) and server logs for error messages.
