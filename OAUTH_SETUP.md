# OAuth Setup Guide - Next Car Doctor

## Step 1: Generate NEXTAUTH_SECRET

Run this command in your terminal to generate a secure secret:

**Windows (PowerShell):**
```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Mac/Linux:**
```bash
openssl rand -base64 32
```

Copy the output and paste it in `.env.local` as the `NEXTAUTH_SECRET` value.

---

## Step 2: Get Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a Project" → "NEW PROJECT"
3. Enter project name: `car-doctor` → Create
4. Wait for project creation
5. Go to APIs & Services → OAuth consent screen
6. Select "External" → Create
7. Fill in:
   - App name: `Car Doctor`
   - User support email: Your email
   - Developer contact: Your email
   - Save and Continue
8. Add scopes → Continue → Back to Dashboard
9. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
10. Select "Web application"
11. Add Authorized redirect URIs:
    - `http://localhost:3000/api/auth/callback/google`
    - (Add production URL later)
12. Copy Client ID and Client Secret
13. Paste in `.env.local`:
    ```
    GOOGLE_CLIENT_ID=your-client-id
    GOOGLE_CLIENT_SECRET=your-client-secret
    ```

---

## Step 3: Get GitHub OAuth Credentials

1. Go to [GitHub Settings → Developer settings](https://github.com/settings/developers)
2. Click "OAuth Apps" → "New OAuth App"
3. Fill in:
   - Application name: `Car Doctor`
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Click "Register application"
5. Copy Client ID and generate a new Client Secret
6. Paste in `.env.local`:
    ```
    GITHUB_CLIENT_ID=your-client-id
    GITHUB_CLIENT_SECRET=your-client-secret
    ```

---

## Step 4: MongoDB Connection (if needed)

If you're using MongoDB:
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and get connection string
3. Paste in `.env.local`:
    ```
    MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/car-doctor
    ```

---

## Step 5: Verify Your .env.local

Your `.env.local` file should look like this:

```
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-generated-secret-here

# MongoDB Connection
MONGODB_URI=your-mongodb-uri

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Public URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## Step 6: Restart Development Server

1. Stop your dev server (Ctrl+C)
2. Run: `npm run dev`
3. Test the login page at `http://localhost:3000/login`
4. Click Google/GitHub buttons - they should now work!

---

## Troubleshooting

### If you get "Redirect URI mismatch" error:
- Make sure the callback URLs in OAuth apps match exactly:
  - Google: `http://localhost:3000/api/auth/callback/google`
  - GitHub: `http://localhost:3000/api/auth/callback/github`

### If buttons don't respond:
- Check browser console (F12) for errors
- Ensure `NEXTAUTH_SECRET` is set
- Clear browser cache and cookies
- Try in incognito/private mode

### If user not created in MongoDB:
- Check MongoDB connection string in `MONGODB_URI`
- Verify database has `users` collection
- Check server logs for database errors

---

## For Production Deployment

When deploying to production (Vercel/etc):

1. Update `NEXTAUTH_URL` to your production domain
2. Add production callback URLs in OAuth apps:
   - Google: `https://yourdomain.com/api/auth/callback/google`
   - GitHub: `https://yourdomain.com/api/auth/callback/github`
3. Add environment variables to your hosting provider's secrets
4. Keep `NEXTAUTH_SECRET` the same across all environments
