# BizLocate Waitlist - Setup Checklist

Use this checklist to get your waitlist app up and running!

## Local Development Setup

### ✅ Step 1: Dependencies
- [x] npm install (already done!)

### ☐ Step 2: Environment Variables
- [ ] Create `.env.local` file in root directory
- [ ] Add Vercel Postgres credentials
- [ ] Add Resend API key
- [ ] Add admin email (frenzyman2024@gmail.com)

**Template:**
```env
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
RESEND_API_KEY=
ADMIN_EMAIL=frenzyman2024@gmail.com
```

### ☐ Step 3: Start Development Server
```bash
npm run dev
```

### ☐ Step 4: Initialize Database
- [ ] Visit: http://localhost:3000/api/init-db
- [ ] Verify response: `{"message":"Database initialized successfully"}`

### ☐ Step 5: Test Locally
- [ ] Visit http://localhost:3000
- [ ] Check video embed loads
- [ ] Submit test email
- [ ] Verify success animation
- [ ] Check admin email for notification
- [ ] Visit http://localhost:3000/admin/signups
- [ ] Verify test entry appears

---

## Production Deployment (Vercel)

### ☐ Step 1: Push to GitHub
```bash
git add .
git commit -m "Initial commit: BizLocate waitlist"
git push origin main
```

### ☐ Step 2: Install Vercel CLI
```bash
npm i -g vercel
```

### ☐ Step 3: Login to Vercel
```bash
vercel login
```

### ☐ Step 4: Create Postgres Database
```bash
vercel storage create postgres
```
- [ ] Note: This automatically adds environment variables

### ☐ Step 5: Get Resend API Key
- [ ] Go to https://resend.com
- [ ] Sign up (free tier: 100 emails/day)
- [ ] Create API key
- [ ] Copy the key

### ☐ Step 6: Add Environment Variables
```bash
vercel env add RESEND_API_KEY
vercel env add ADMIN_EMAIL
```

### ☐ Step 7: Deploy
```bash
vercel --prod
```

### ☐ Step 8: Initialize Production Database
- [ ] Visit: https://your-domain.vercel.app/api/init-db
- [ ] Verify success message

### ☐ Step 9: Test Production App
- [ ] Visit deployed URL
- [ ] Submit test email
- [ ] Check admin email
- [ ] Visit /admin/signups

---

## Features Checklist

### Landing Page
- [x] BizLocate logo and branding
- [x] Tagline: "Finding the best location for your business"
- [x] Loom video embed
- [x] Live waitlist counter
- [x] Email + name form
- [x] Success animation
- [x] Mobile responsive
- [x] Dark theme with gradient background

### Backend
- [x] POST /api/waitlist endpoint
- [x] GET /api/waitlist endpoint (count)
- [x] Email validation
- [x] Duplicate prevention
- [x] Real-time counter updates

### Database
- [x] Postgres schema created
- [x] Unique email constraint
- [x] Timestamp tracking

### Email Notifications
- [x] Resend integration
- [x] Admin notifications on signup
- [x] Includes signup details + total count

### Admin Dashboard
- [x] /admin/signups page
- [x] List all signups
- [x] Display email, name, date, ID
- [x] Show total count

---

## Optional Enhancements

### Security
- [ ] Add authentication to /admin routes
- [ ] Implement rate limiting
- [ ] Add CAPTCHA to form

### Features
- [ ] Export signups to CSV
- [ ] Add email templates
- [ ] Add social sharing
- [ ] Add referral tracking

### Customization
- [ ] Custom domain setup
- [ ] Change color scheme
- [ ] Add more animations
- [ ] Add analytics (Vercel Analytics)

---

## Troubleshooting

### ❌ Database error?
→ Check environment variables
→ Visit /api/init-db

### ❌ Emails not sending?
→ Verify Resend API key
→ Check free tier limits (100/day)
→ Check Resend dashboard logs

### ❌ Counter not updating?
→ Check browser console
→ Test /api/waitlist endpoint
→ Verify database connection

---

## Support Resources

- 📖 [Full Documentation](README.md)
- 🚀 [Deployment Guide](DEPLOYMENT.md)
- 💌 Email: frenzyman2024@gmail.com

---

## Quick Commands

```bash
# Development
npm run dev

# Build
npm run build

# Deploy to Vercel
vercel --prod

# View logs
vercel logs

# Check environment variables
vercel env ls

# Pull environment variables to local
vercel env pull .env.local
```

---

**Last Updated:** 2025-11-01
**Status:** ✅ Ready to Deploy!
