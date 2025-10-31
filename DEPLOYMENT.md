# Quick Deployment Guide

## Step-by-Step Vercel Deployment

### 1. Prepare Your Repository

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit: BizLocate waitlist app"

# Push to GitHub
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - Project name? bizlocate-waitlist (or your choice)
# - Directory? ./
# - Override settings? No

# Your app will be deployed!
```

#### Option B: Using Vercel Dashboard

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next
4. Click "Deploy"

### 3. Set Up Vercel Postgres

```bash
# Using Vercel CLI
vercel storage create postgres

# Or via dashboard:
# 1. Go to your project on Vercel
# 2. Click "Storage" tab
# 3. Click "Create Database"
# 4. Select "Postgres"
# 5. Name it (e.g., "bizlocate-waitlist-db")
# 6. Create
```

This automatically adds Postgres environment variables to your project.

### 4. Set Up Resend

1. Go to https://resend.com
2. Sign up (free: 100 emails/day, 3000/month)
3. Go to API Keys section
4. Create new API key
5. Copy the key

### 5. Add Environment Variables

#### Via Vercel CLI:
```bash
# Add Resend API Key
vercel env add RESEND_API_KEY

# Paste your Resend API key when prompted
# Select all environments (Production, Preview, Development)

# Add Admin Email
vercel env add ADMIN_EMAIL

# Enter: frenzyman2024@gmail.com
```

#### Via Vercel Dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add:
   - `RESEND_API_KEY`: Your Resend API key
   - `ADMIN_EMAIL`: frenzyman2024@gmail.com
4. Apply to: Production, Preview, Development

### 6. Redeploy

```bash
# Via CLI
vercel --prod

# Or via dashboard
# Go to Deployments → Click "Redeploy"
```

### 7. Initialize Database

Visit: `https://your-domain.vercel.app/api/init-db`

You should see: `{"message":"Database initialized successfully"}`

### 8. Test Your App

1. Visit your deployed URL
2. Submit a test email
3. Check the admin email (frenzyman2024@gmail.com) for notification
4. Visit `https://your-domain.vercel.app/admin/signups` to see the entry

## Verify Everything Works

✅ Main page loads with BizLocate branding
✅ Video embed displays correctly
✅ Counter shows current number
✅ Form submission works
✅ Success animation appears
✅ Counter updates after submission
✅ Email notification received
✅ Admin page shows signup

## Common Issues

### Issue: "Database connection failed"
**Solution:** Make sure you created Vercel Postgres and environment variables are set

### Issue: "Email not sending"
**Solution:** Verify RESEND_API_KEY is correct and you haven't exceeded free tier limits

### Issue: "Table doesn't exist"
**Solution:** Visit `/api/init-db` to create the database table

### Issue: "Environment variables not found"
**Solution:** Redeploy after adding environment variables

## Post-Deployment

### Custom Domain (Optional)

```bash
# Via CLI
vercel domains add yourdomain.com

# Or via dashboard:
# Settings → Domains → Add Domain
```

### Monitor Your Waitlist

- Check signups: `https://your-domain.vercel.app/admin/signups`
- Email notifications arrive at: frenzyman2024@gmail.com

### Security Recommendations

1. **Add Authentication to Admin Page**
   - Consider adding middleware for `/admin/*` routes
   - Use NextAuth.js or similar

2. **Rate Limiting**
   - Consider adding rate limiting to prevent spam
   - Use Vercel Edge Config or Upstash

3. **Custom Domain**
   - Add your own domain for professional appearance

## Update Your App

```bash
# Make changes to your code
git add .
git commit -m "Update: description of changes"
git push

# Vercel will automatically deploy the changes!
```

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Postgres Docs](https://vercel.com/docs/storage/vercel-postgres)
- [Resend Documentation](https://resend.com/docs)

## Support

Questions? Email: frenzyman2024@gmail.com
