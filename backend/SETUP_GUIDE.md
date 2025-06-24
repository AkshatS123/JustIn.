# User Profile Creation Setup Guide

This guide is meant to help set up automatic user profile creation when users sign up through Supabase.

## What I've Built

✅ **Backend API Endpoints:**
- `POST /api/users` - Create user profile (for webhook)
- `GET /api/users/me` - Get current user profile (protected)
- `PUT /api/users/me` - Update user profile (protected)
- `GET /api/users/:id` - Get user by ID (public)

✅ **Webhook Endpoint:**
- `POST /api/webhooks/supabase/user-created` - Handles Supabase user creation events

✅ **Security:**
- Webhook signature verification
- JWT authentication for protected routes
- Input validation

## Step 1: Update Database Schema

Since we made the password field optional, you need to update your database:

```bash
cd backend
npx prisma db push
```

## Step 2: Set Up Supabase Webhook

### 2.1 Go to Supabase Dashboard
1. Open your Supabase project dashboard
2. Navigate to **Database** → **Webhooks**

### 2.2 Create New Webhook
1. Click **"Create a new webhook"**
2. Configure the webhook:

**Basic Settings:**
- **Name:** `user-created-webhook`
- **Table:** `auth.users`
- **Events:** Select `INSERT` only
- **HTTP Method:** `POST`

**HTTP Request Settings:**
- **URL:** `https://your-backend-url.com/api/webhooks/supabase/user-created`
  - For local development: `http://localhost:5000/api/webhooks/supabase/user-created`
  - For production: Your deployed backend URL

**Headers:**
- `Content-Type`: `application/json`

### 2.3 Test the Webhook
1. After creating the webhook, go to the **Logs** tab
2. Create a test user in Supabase Auth
3. Check if the webhook was triggered successfully

## Step 3: Test the System

### 3.1 Start Your Backend
```bash
cd backend
npm run dev
```

### 3.2 Test User Creation
You can test the user creation endpoint directly:

```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "id": "test-user-id",
    "email": "test@example.com",
    "username": "testuser",
    "bio": "Test bio"
  }'
```

### 3.3 Test Protected Routes
To test protected routes, you'll need a valid JWT token from Supabase:

```bash
curl -X GET http://localhost:5000/api/users/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Step 4: Frontend Integration

### 4.1 Install Supabase Client
```bash
cd ..  # Go back to project root
npm install @supabase/supabase-js
```

### 4.2 Create Supabase Client
Create `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### 4.3 Update Environment Variables
Add to your frontend `.env`:

```env
VITE_SUPABASE_URL=https://vfogbbfhfzzclqvgspni.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmb2diYmZoZnp6Y2xxdmdzcG5pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzODA4MTYsImV4cCI6MjA2NTk1NjgxNn0._VqsHAhlexjxwphZfp9pfPF00AmmfI-ucewN_EUhP0g
```

## Step 5: Deployment

### 5.1 Deploy Backend
1. Push your code to GitHub
2. Deploy to Railway or Vercel
3. Update the webhook URL in Supabase to point to your deployed backend

### 5.2 Update Environment Variables
Make sure your deployed backend has all the required environment variables:
- `DATABASE_URL`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_JWT_SECRET`
- `REDIS_URL`
- `CLOUDINARY_*` variables

## How It Works

1. **User signs up** in your React app using Supabase Auth
2. **Supabase creates** the user in their auth system
3. **Supabase webhook** automatically calls your backend endpoint
4. **Your backend** creates a corresponding user profile in your database
5. **User can now** access protected routes and create products

## Troubleshooting

### Webhook Not Triggering
- Check Supabase webhook logs
- Verify the webhook URL is correct
- Ensure the webhook is enabled

### Database Errors
- Run `npx prisma db push` to update schema
- Check your `DATABASE_URL` is correct
- Verify Supabase database connection

### Authentication Errors
- Check your `SUPABASE_JWT_SECRET` matches Supabase settings
- Verify JWT token format in requests
- Ensure CORS is configured correctly

## Next Steps

Once this is working, you can:
1. Build product creation endpoints
2. Add image upload functionality with Cloudinary
3. Implement messaging system
4. Add search and filtering
5. Deploy to production 