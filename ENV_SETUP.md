# Environment Variables Setup Guide

This file contains all the environment variables you need to set up for deployment.

## Backend Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# MongoDB Connection String
# Replace YOUR_ACTUAL_PASSWORD with your actual database password
MONGO_URI=mongodb+srv://pr2928272625_db_user:YOUR_ACTUAL_PASSWORD@foodexpress.4ctdzcm.mongodb.net/foodexpress?appName=FoodExpress

# Server Port (Render will set this automatically, but you can override)
PORT=4000

# JWT Secret Key
# Generate a strong random string (e.g., use: openssl rand -base64 32)
JWT_SECRET=your_very_strong_jwt_secret_key_here_minimum_32_characters

# Stripe Secret Key
# Get from: https://dashboard.stripe.com/apikeys
# Use test key (sk_test_...) for testing, live key (sk_live_...) for production
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here

# Frontend URL (for Stripe redirect URLs and CORS)
# Set this to your deployed frontend URL
FRONTEND_URL=https://your-frontend-url.onrender.com

# Node Environment
NODE_ENV=production
```

## Frontend Environment Variables

Create a `.env` file in the `frontend` directory:

```env
# Backend API URL
# Replace with your deployed backend URL
VITE_API_URL=https://your-backend-url.onrender.com
```

## Admin Panel Environment Variables

Create a `.env` file in the `admin` directory:

```env
# Backend API URL
# Replace with your deployed backend URL (same as frontend)
VITE_API_URL=https://your-backend-url.onrender.com
```

## How to Get MongoDB Connection String

1. Log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Select your cluster
3. Click "Connect"
4. Choose "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database user password
7. Replace `<dbname>` with `foodexpress` (or your database name)

Example:
```
mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/foodexpress?retryWrites=true&w=majority
```

## How to Get Stripe Keys

1. Sign up/Log in to [Stripe](https://stripe.com)
2. Go to Developers → API keys
3. Copy your Secret key
4. For testing, use "Test mode" keys (start with `sk_test_`)
5. For production, use "Live mode" keys (start with `sk_live_`)

## Generating JWT Secret

You can generate a secure JWT secret using:

**On Linux/Mac:**
```bash
openssl rand -base64 32
```

**On Windows (PowerShell):**
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

**Or use an online generator:**
- https://www.grc.com/passwords.htm

## Setting Environment Variables in Render

1. Go to your service in Render dashboard
2. Click on "Environment" tab
3. Click "Add Environment Variable"
4. Add each variable one by one
5. Click "Save Changes" (this will trigger a redeploy)

## Important Notes

- ⚠️ **Never commit `.env` files to GitHub**
- ✅ `.env` files are already in `.gitignore`
- 🔒 Keep your secrets secure
- 🔄 Restart services after changing environment variables
- 📝 Use different keys for development and production

## Quick Checklist

- [ ] MongoDB connection string obtained and tested
- [ ] JWT secret generated (32+ characters)
- [ ] Stripe keys obtained (test or live)
- [ ] Backend `.env` file created with all variables
- [ ] Frontend `.env` file created with backend URL
- [ ] Admin `.env` file created with backend URL
- [ ] Environment variables added to Render dashboard
- [ ] Services redeployed after adding variables

