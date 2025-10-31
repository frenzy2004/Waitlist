# BizLocate Waitlist

A modern, animated waitlist form for BizLocate - Finding the best location for your business.

## Features

- Beautiful, animated landing page with video embed
- Real-time waitlist counter
- Email capture with optional name field
- Duplicate prevention
- Email notifications to admin on new signups
- Admin dashboard to view all signups
- Mobile responsive
- Dark theme

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Vercel Postgres
- Resend (Email notifications)

## Setup Instructions

### 1. Clone and Install

```bash
npm install
```

### 2. Set Up Vercel Postgres

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Create a new project or select existing one
3. Go to Storage tab
4. Create a Postgres database
5. Copy the environment variables

### 3. Set Up Resend

1. Go to [Resend](https://resend.com)
2. Sign up for a free account (100 emails/day)
3. Generate an API key
4. Copy the API key

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Vercel Postgres (copy from Vercel dashboard)
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=

# Resend API Key
RESEND_API_KEY=

# Admin Email (your email to receive notifications)
ADMIN_EMAIL=frenzyman2024@gmail.com
```

### 5. Initialize Database

Run the development server first:

```bash
npm run dev
```

Then visit: `http://localhost:3000/api/init-db`

This will create the `waitlist` table in your Postgres database.

### 6. Test the Application

1. Visit `http://localhost:3000` - Main waitlist page
2. Submit the form with an email
3. Check your admin email for notification
4. Visit `http://localhost:3000/admin/signups` - View all signups

## Deployment to Vercel

### Using Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Set environment variables in Vercel dashboard:
   - Go to your project settings
   - Navigate to Environment Variables
   - Add all the variables from `.env.local`

5. After first deployment, visit:
   `https://your-domain.vercel.app/api/init-db`
   to initialize the database.

### Using Vercel Dashboard

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/new)
3. Import your repository
4. Add environment variables in project settings
5. Deploy
6. Visit `/api/init-db` to initialize database

## Project Structure

```
Waitlist/
├── app/
│   ├── api/
│   │   ├── admin/
│   │   │   └── signups/
│   │   │       └── route.ts       # Admin API endpoint
│   │   ├── init-db/
│   │   │   └── route.ts           # Database initialization
│   │   └── waitlist/
│   │       └── route.ts           # Main waitlist API
│   ├── admin/
│   │   └── signups/
│   │       └── page.tsx           # Admin dashboard
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Main landing page
├── lib/
│   ├── db.ts                      # Database utilities
│   └── email.ts                   # Email utilities
├── .env.example                   # Environment variables template
├── .env.local                     # Your local environment variables (create this)
├── package.json
└── README.md
```

## API Endpoints

### POST /api/waitlist
Submit email to waitlist
```json
{
  "email": "user@example.com",
  "name": "John Doe" // optional
}
```

### GET /api/waitlist
Get current waitlist count

### GET /api/admin/signups
Get all waitlist entries

### GET /api/init-db
Initialize database (run once)

## Features Explained

### Real-time Counter
- Fetches count on page load
- Updates immediately after successful signup
- Shows live number of people on waitlist

### Email Notifications
- Sends instant notification to admin email on new signup
- Includes signup details and total count
- Uses Resend (free tier: 100 emails/day)

### Duplicate Prevention
- Unique constraint on email field
- Shows friendly error message if email already registered
- Prevents spam and duplicate entries

### Admin Dashboard
- Simple table view of all signups
- Shows ID, email, name, and signup date
- No authentication (add if needed for production)

## Customization

### Change Colors
Edit [tailwind.config.ts](tailwind.config.ts) and [app/globals.css](app/globals.css)

### Change Video
Replace the Loom embed URL in [app/page.tsx](app/page.tsx)

### Change Admin Email
Update `ADMIN_EMAIL` in your environment variables

### Add Authentication to Admin Page
Consider adding middleware or route protection for `/admin/signups`

## Troubleshooting

### Database Connection Error
- Verify environment variables are correct
- Make sure Vercel Postgres is created and connected
- Check if database is initialized by visiting `/api/init-db`

### Email Not Sending
- Verify Resend API key is correct
- Check Resend dashboard for error logs
- Free tier limit: 100 emails/day

### Counter Not Updating
- Check browser console for errors
- Verify API endpoint is working: visit `/api/waitlist`
- Check database connection

## License

MIT

## Support

For issues or questions, contact: frenzyman2024@gmail.com
