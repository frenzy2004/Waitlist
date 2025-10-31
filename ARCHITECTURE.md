# BizLocate Waitlist - Architecture

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                          USER BROWSER                           │
│                  https://your-app.vercel.app                    │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                      NEXT.JS 15 APP                             │
│                    (Vercel Hosting)                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────────────────────────────────────────┐    │
│  │            FRONTEND (Client Components)               │    │
│  ├───────────────────────────────────────────────────────┤    │
│  │  • Landing Page (/)                                   │    │
│  │    - Hero Section with BizLocate Logo                 │    │
│  │    - Loom Video Embed                                 │    │
│  │    - Live Counter (React State)                       │    │
│  │    - Email + Name Form                                │    │
│  │    - Success Animation (Framer Motion)               │    │
│  │                                                       │    │
│  │  • Admin Dashboard (/admin/signups)                  │    │
│  │    - Table of All Signups                            │    │
│  │    - Display: ID, Email, Name, Date                  │    │
│  └───────────────────────────────────────────────────────┘    │
│                             │                                   │
│                             ▼                                   │
│  ┌───────────────────────────────────────────────────────┐    │
│  │             API ROUTES (Server-Side)                  │    │
│  ├───────────────────────────────────────────────────────┤    │
│  │                                                       │    │
│  │  POST /api/waitlist                                  │    │
│  │   ├─ Validate email format                           │    │
│  │   ├─ Insert into database (with duplicate check)     │    │
│  │   ├─ Get updated count                               │    │
│  │   ├─ Send email notification (async)                 │    │
│  │   └─ Return success + count                          │    │
│  │                                                       │    │
│  │  GET /api/waitlist                                   │    │
│  │   └─ Return current signup count                     │    │
│  │                                                       │    │
│  │  GET /api/admin/signups                              │    │
│  │   └─ Return all signups (ordered by date)            │    │
│  │                                                       │    │
│  │  GET /api/init-db                                    │    │
│  │   └─ Create waitlist table (run once)                │    │
│  │                                                       │    │
│  └───────────────────────────────────────────────────────┘    │
│                             │                                   │
│                    ┌────────┴────────┐                         │
│                    ▼                 ▼                          │
│         ┌──────────────────┐  ┌──────────────────┐            │
│         │   lib/db.ts      │  │   lib/email.ts   │            │
│         │  (Database)      │  │   (Email)        │            │
│         └──────────────────┘  └──────────────────┘            │
└─────────────────────────────────────────────────────────────────┘
                    │                         │
                    ▼                         ▼
    ┌───────────────────────────┐  ┌───────────────────────┐
    │   VERCEL POSTGRES         │  │   RESEND API          │
    │   (Database)              │  │   (Email Service)     │
    ├───────────────────────────┤  ├───────────────────────┤
    │  waitlist table:          │  │  Send email to:       │
    │   - id (serial)           │  │  frenzyman2024@       │
    │   - email (unique)        │  │  gmail.com            │
    │   - name (optional)       │  │                       │
    │   - created_at            │  │  Email includes:      │
    │                           │  │   - Signup email      │
    │  Operations:              │  │   - Name              │
    │   - INSERT (with dup      │  │   - Total count       │
    │     check)                │  │   - Timestamp         │
    │   - SELECT COUNT(*)       │  │                       │
    │   - SELECT * (admin)      │  │                       │
    └───────────────────────────┘  └───────────────────────┘
```

---

## Data Flow

### User Signup Flow

```
1. User visits landing page
   └─► GET /api/waitlist (fetch current count)
        └─► Display: "Join 247 people on the waitlist"

2. User enters email + name, clicks "Join Waitlist"
   └─► POST /api/waitlist { email, name }
        │
        ├─► Validate email format
        │    └─► If invalid: Return 400 error
        │
        ├─► Insert into database
        │    ├─► Check unique constraint
        │    │    └─► If duplicate: Return "Email already registered"
        │    └─► Success: Record inserted
        │
        ├─► Get updated count
        │    └─► SELECT COUNT(*) FROM waitlist
        │
        ├─► Send email notification (async, don't wait)
        │    └─► Resend API call
        │         └─► Email sent to frenzyman2024@gmail.com
        │
        └─► Return { success: true, count: 248 }
             └─► Frontend shows success animation
                  └─► Counter updates to 248
```

### Admin Dashboard Flow

```
1. Admin visits /admin/signups
   └─► GET /api/admin/signups
        └─► SELECT * FROM waitlist ORDER BY created_at DESC
             └─► Return all entries
                  └─► Display in table format
```

---

## Component Architecture

### Frontend Components

```
app/
├── layout.tsx (Root Layout)
│   └─► Sets metadata, includes globals.css
│
├── page.tsx (Landing Page - Client Component)
│   ├─► State Management:
│   │   ├─ email (form input)
│   │   ├─ name (form input)
│   │   ├─ count (waitlist counter)
│   │   ├─ isLoading (submit state)
│   │   ├─ isSuccess (success animation)
│   │   └─ error (error message)
│   │
│   ├─► useEffect: Fetch initial count on mount
│   │
│   ├─► handleSubmit:
│   │   ├─ Validate input
│   │   ├─ Call POST /api/waitlist
│   │   ├─ Show success/error
│   │   └─ Update count
│   │
│   └─► UI Elements:
│       ├─ Logo + Tagline
│       ├─ Loom Video Iframe
│       ├─ Counter Display
│       ├─ Form (email + name inputs)
│       └─ Success Animation (AnimatePresence)
│
└── admin/signups/page.tsx (Admin Dashboard - Client Component)
    ├─► State Management:
    │   ├─ entries (array of signups)
    │   ├─ loading (fetch state)
    │   └─ error (error message)
    │
    ├─► useEffect: Fetch signups on mount
    │
    └─► UI Elements:
        ├─ Header (total count)
        ├─ Table (all signups)
        └─ Back button
```

### Backend Services

```
lib/
├── db.ts (Database Layer)
│   ├─► initDatabase()
│   │   └─ CREATE TABLE IF NOT EXISTS waitlist
│   │
│   ├─► addToWaitlist(email, name)
│   │   ├─ INSERT with duplicate check
│   │   └─ Return success/error
│   │
│   ├─► getWaitlistCount()
│   │   └─ SELECT COUNT(*)
│   │
│   └─► getAllWaitlistEntries()
│       └─ SELECT * ORDER BY created_at DESC
│
└── email.ts (Email Service)
    └─► sendWaitlistNotification(email, name, count)
        ├─ Check Resend API key exists
        ├─ Compose HTML email
        ├─ Send via Resend
        └─ Return success/error
```

---

## Database Schema

```sql
CREATE TABLE IF NOT EXISTS waitlist (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Indexes
- **Primary Key:** `id` (auto-increment)
- **Unique Constraint:** `email` (prevents duplicates)

### Constraints
- `email` must be unique
- `email` cannot be null
- `created_at` defaults to current timestamp

---

## API Specification

### POST /api/waitlist

**Request:**
```json
{
  "email": "user@example.com",
  "name": "John Doe" // optional
}
```

**Success Response (200):**
```json
{
  "success": true,
  "count": 248,
  "message": "Successfully joined the waitlist!"
}
```

**Error Response (400):**
```json
{
  "error": "Email already registered"
}
// or
{
  "error": "Valid email is required"
}
```

---

### GET /api/waitlist

**Response (200):**
```json
{
  "count": 247
}
```

---

### GET /api/admin/signups

**Response (200):**
```json
{
  "entries": [
    {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe",
      "created_at": "2025-11-01T12:00:00.000Z"
    },
    // ... more entries
  ]
}
```

---

### GET /api/init-db

**Success Response (200):**
```json
{
  "message": "Database initialized successfully"
}
```

**Error Response (500):**
```json
{
  "error": "Failed to initialize database",
  "details": { /* error object */ }
}
```

---

## Environment Variables

```
# Vercel Postgres (auto-configured)
POSTGRES_URL=postgresql://...
POSTGRES_PRISMA_URL=postgresql://...
POSTGRES_URL_NON_POOLING=postgresql://...
POSTGRES_USER=default
POSTGRES_HOST=xxx.postgres.vercel-storage.com
POSTGRES_PASSWORD=xxx
POSTGRES_DATABASE=verceldb

# Resend (manual configuration)
RESEND_API_KEY=re_xxxxx

# Admin Email (manual configuration)
ADMIN_EMAIL=frenzyman2024@gmail.com
```

---

## Tech Stack Details

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend Framework** | Next.js 15 | React framework with App Router |
| **UI Library** | React 19 | Component-based UI |
| **Styling** | Tailwind CSS 3.4 | Utility-first CSS |
| **Animation** | Framer Motion 11.5 | Smooth animations |
| **Language** | TypeScript 5 | Type safety |
| **Database** | Vercel Postgres | Managed PostgreSQL |
| **Email Service** | Resend | Transactional emails |
| **Hosting** | Vercel | Serverless deployment |
| **Linting** | ESLint | Code quality |

---

## Performance Characteristics

### Build Sizes
```
Main page:        39.3 kB (141 kB First Load)
Admin page:       1.05 kB (103 kB First Load)
API routes:       131 B each
Shared JS:        102 kB
```

### Rendering Strategy
- **Landing Page:** Server-Side Rendered (SSR) with Client Hydration
- **Admin Page:** Server-Side Rendered (SSR) with Client Hydration
- **API Routes:** Server-Side Only (no client bundle)

### Caching
- Static assets cached by Vercel CDN
- API routes: No caching (dynamic content)
- Database: Connection pooling enabled

---

## Security Considerations

### Implemented
✅ SQL injection prevention (parameterized queries)
✅ Email validation (regex + HTML5)
✅ Unique email constraint (database level)
✅ Environment variables for secrets
✅ HTTPS (enforced by Vercel)
✅ Error messages don't expose internals

### Recommended Additions
- [ ] Rate limiting (prevent spam)
- [ ] CAPTCHA (prevent bots)
- [ ] Admin authentication (protect dashboard)
- [ ] CORS configuration (if needed)
- [ ] Input sanitization (additional layer)

---

## Scalability

### Current Limits
- **Database Connections:** Pooled (Vercel Postgres)
- **Email:** 100/day (Resend free tier)
- **Hosting:** Auto-scaling (Vercel)
- **Bandwidth:** Generous free tier

### Scaling Strategy
1. **Database:** Vercel Postgres scales automatically
2. **Email:** Upgrade Resend plan ($20/month for 50k emails)
3. **Hosting:** Vercel scales automatically
4. **CDN:** Static assets cached globally

---

## Monitoring & Debugging

### Vercel Dashboard
- View deployment logs
- Monitor function invocations
- Check error rates
- Database query performance

### Resend Dashboard
- Email delivery status
- Bounce/complaint tracking
- API usage statistics

### Database
```sql
-- Check total signups
SELECT COUNT(*) FROM waitlist;

-- Recent signups
SELECT * FROM waitlist
ORDER BY created_at DESC
LIMIT 10;

-- Signups per day
SELECT DATE(created_at), COUNT(*)
FROM waitlist
GROUP BY DATE(created_at)
ORDER BY DATE(created_at) DESC;
```

---

## Deployment Pipeline

```
Local Development
      │
      ├─► Edit code
      ├─► npm run dev (test locally)
      └─► git commit
           │
           ▼
      Git Push
           │
           ▼
  Vercel Auto-Deploy
      │
      ├─► Build Next.js app
      ├─► Run type checking
      ├─► Run ESLint
      ├─► Optimize bundles
      └─► Deploy to production
           │
           ▼
    Production Live
      │
      └─► Auto-scaling enabled
           └─► CDN caching active
```

---

## Development Workflow

### Local Setup
```bash
1. npm install
2. Create .env.local
3. Add environment variables
4. npm run dev
5. Visit http://localhost:3000/api/init-db
6. Test at http://localhost:3000
```

### Making Changes
```bash
1. Edit files
2. Save (hot reload)
3. Test locally
4. git add . && git commit
5. git push (auto-deploys)
```

### Production Deployment
```bash
vercel --prod
```

---

## File Dependencies

```
page.tsx (Landing)
  │
  ├─► /api/waitlist (GET: count)
  ├─► /api/waitlist (POST: submit)
  └─► globals.css

admin/signups/page.tsx
  │
  ├─► /api/admin/signups (GET: all entries)
  └─► globals.css

/api/waitlist/route.ts
  │
  ├─► lib/db.ts (database operations)
  └─► lib/email.ts (send notifications)

lib/db.ts
  │
  └─► @vercel/postgres (SQL queries)

lib/email.ts
  │
  └─► resend (email API)
```

---

## Error Handling

### Frontend
- Form validation errors → Show red text below form
- Network errors → Show "Network error. Please try again."
- Duplicate email → Show "Email already registered"
- Success → Show green animation

### Backend
- Database errors → Log + return 500
- Validation errors → Return 400 with message
- Email errors → Log + continue (don't block signup)
- Missing env vars → Graceful degradation

---

## Testing Checklist

### Local Testing
- [ ] Landing page loads
- [ ] Video plays
- [ ] Counter displays
- [ ] Form submission works
- [ ] Success animation shows
- [ ] Admin page displays data

### Production Testing
- [ ] Deploy successful
- [ ] Database initialized
- [ ] Form submission works
- [ ] Email received
- [ ] Admin page accessible
- [ ] Mobile responsive

---

**Last Updated:** 2025-11-01
**Version:** 1.0.0
