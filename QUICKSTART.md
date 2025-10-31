# 🚀 Quick Start Guide

Get your BizLocate waitlist running in 5 minutes!

## What You Need

1. **Vercel Account** (free) - https://vercel.com
2. **Resend Account** (free, 100 emails/day) - https://resend.com

## Setup Steps

### 1️⃣ Set Up Vercel Postgres

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Create Postgres database
vercel storage create postgres
```

This creates your database and automatically adds all Postgres environment variables.

### 2️⃣ Get Resend API Key

1. Go to https://resend.com and sign up
2. Click "API Keys" in sidebar
3. Click "Create API Key"
4. Copy the key (starts with `re_`)

### 3️⃣ Add Environment Variables

```bash
# Add Resend API key
vercel env add RESEND_API_KEY
# Paste your key when prompted

# Add admin email
vercel env add ADMIN_EMAIL
# Enter: frenzyman2024@gmail.com
```

For both, select: **Production, Preview, Development** (use space to select, enter to confirm)

### 4️⃣ Deploy

```bash
vercel --prod
```

Your app will be deployed! Note the URL (e.g., `https://your-app.vercel.app`)

### 5️⃣ Initialize Database

Visit: `https://your-app.vercel.app/api/init-db`

You should see: `{"message":"Database initialized successfully"}`

### 6️⃣ Test It!

1. Go to your deployed URL
2. Enter a test email
3. Click "Join Waitlist"
4. Check frenzyman2024@gmail.com for notification
5. Visit `/admin/signups` to see all signups

---

## Local Development

If you want to run locally:

1. **Pull environment variables:**
```bash
vercel env pull .env.local
```

2. **Add Resend API key manually** (if not pulled):
Edit `.env.local` and add:
```
RESEND_API_KEY=your_key_here
ADMIN_EMAIL=frenzyman2024@gmail.com
```

3. **Start dev server:**
```bash
npm run dev
```

4. **Initialize local database:**
Visit: http://localhost:3000/api/init-db

5. **Test:**
Open http://localhost:3000

---

## Important URLs

- **Main page:** `https://your-domain.vercel.app`
- **Admin dashboard:** `https://your-domain.vercel.app/admin/signups`
- **Initialize DB:** `https://your-domain.vercel.app/api/init-db` (run once)

---

## What's Included

✅ Beautiful landing page with BizLocate branding
✅ Loom video embed
✅ Live waitlist counter
✅ Email + name capture form
✅ Success animation on signup
✅ Email notifications to frenzyman2024@gmail.com
✅ Admin dashboard to view all signups
✅ Duplicate email prevention
✅ Mobile responsive design
✅ Dark theme with gradient

---

## Next Steps

### Add a Custom Domain (Optional)
```bash
vercel domains add yourdomain.com
```

### View Your Signups
Visit: `/admin/signups`

### Monitor Deployments
```bash
vercel logs
```

---

## Troubleshooting

**Problem:** Can't deploy
**Solution:** Make sure you're logged in: `vercel login`

**Problem:** Database error
**Solution:** Visit `/api/init-db` to create the table

**Problem:** Emails not sending
**Solution:** Check your Resend API key is correct

---

## Full Documentation

- 📘 [README.md](README.md) - Complete documentation
- 🚀 [DEPLOYMENT.md](DEPLOYMENT.md) - Detailed deployment guide
- ✅ [CHECKLIST.md](CHECKLIST.md) - Step-by-step checklist

---

## Support

Need help? Email: frenzyman2024@gmail.com

---

**That's it! Your waitlist is ready to collect signups! 🎉**
