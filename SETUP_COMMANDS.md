# Setup Commands - Run These Next

Your app is deployed! 🎉

**Deployment URL:** https://bizlocate-waitlist-x6yrt4wqt-frenzy2004s-projects.vercel.app

## Step 1: Create Postgres Database

Go to your Vercel dashboard and create a Postgres database:
1. Visit: https://vercel.com/frenzy2004s-projects/bizlocate-waitlist
2. Go to "Storage" tab
3. Click "Create Database"
4. Select "Postgres"
5. Name it: `bizlocate-waitlist-db`
6. Click "Create"

This will automatically add all Postgres environment variables to your project.

## Step 2: Get Resend API Key

1. Go to https://resend.com
2. Sign up (free: 100 emails/day)
3. Go to API Keys section
4. Create a new API key
5. Copy the key (starts with `re_`)

## Step 3: Add Environment Variables

Run these commands in your terminal:

```bash
# Add Resend API Key
vercel env add RESEND_API_KEY
# When prompted:
# - Enter your Resend API key
# - Select: Production, Preview, Development (use space to select, enter to confirm)

# Add Admin Email
vercel env add ADMIN_EMAIL
# When prompted:
# - Enter: frenzyman2024@gmail.com
# - Select: Production, Preview, Development
```

## Step 4: Redeploy

After adding environment variables, redeploy:

```bash
vercel --prod
```

## Step 5: Initialize Database

Visit this URL to create the database table:
```
https://bizlocate-waitlist-x6yrt4wqt-frenzy2004s-projects.vercel.app/api/init-db
```

You should see: `{"message":"Database initialized successfully"}`

## Step 6: Test Your Waitlist

1. Visit: https://bizlocate-waitlist-x6yrt4wqt-frenzy2004s-projects.vercel.app
2. Enter a test email
3. Click "Join Waitlist"
4. Check frenzyman2024@gmail.com for notification
5. View signups at: /admin/signups

## Alternative: Use Vercel Dashboard

You can also add environment variables through the web interface:

1. Go to: https://vercel.com/frenzy2004s-projects/bizlocate-waitlist/settings/environment-variables
2. Add:
   - `RESEND_API_KEY` = your_resend_api_key
   - `ADMIN_EMAIL` = frenzyman2024@gmail.com
3. Apply to: Production, Preview, Development
4. Redeploy from the Deployments tab

## Quick Test

Once everything is set up, test with:

```bash
# Test the API
curl https://bizlocate-waitlist-x6yrt4wqt-frenzy2004s-projects.vercel.app/api/waitlist

# Should return: {"count":0}
```

---

**Your deployment is live!** Just need to add the environment variables and initialize the database.
