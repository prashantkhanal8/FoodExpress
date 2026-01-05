# Deployment Guide for FoodExpress

This guide will help you deploy your FoodExpress application to production.

## Prerequisites

- ✅ GitHub repository (already done)
- ✅ MongoDB Atlas cluster (already done)
- ✅ Database named "foodexpress" (already done)
- MongoDB Atlas connection string
- Stripe account (for payment processing)
- Render account (or similar hosting service)

## Step 1: Get Your MongoDB Connection String

Your MongoDB connection string is:
```
mongodb+srv://pr2928272625_db_user:<db_password>@foodexpress.4ctdzcm.mongodb.net/foodexpress?appName=FoodExpress
```

**Important:** Replace `<db_password>` with your actual database password when setting the environment variable.

## Step 2: Deploy Backend to Render

### Option A: Using Render Dashboard

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `foodexpress-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Root Directory**: Leave empty (or set to `backend` if needed)

5. Add Environment Variables:
   ```
   MONGO_URI=mongodb+srv://pr2928272625_db_user:YOUR_ACTUAL_PASSWORD@foodexpress.4ctdzcm.mongodb.net/foodexpress?appName=FoodExpress
   JWT_SECRET=your_strong_random_secret_key_here
   STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
   FRONTEND_URL=https://your-frontend-url.onrender.com
   PORT=4000
   NODE_ENV=production
   ```
   **Notes:** 
   - Replace `YOUR_ACTUAL_PASSWORD` with your actual MongoDB password
   - Replace `https://your-frontend-url.onrender.com` with your actual frontend URL (set this after deploying frontend)

6. Click "Create Web Service"
7. Wait for deployment to complete
8. Copy your backend URL (e.g., `https://foodexpress-backend.onrender.com`)

### Option B: Using render.yaml (Recommended)

1. Push the `render.yaml` file to your GitHub repository
2. Go to Render Dashboard → "New +" → "Blueprint"
3. Connect your repository
4. Render will automatically detect `render.yaml` and create services
5. Add environment variables in the Render dashboard for each service

## Step 3: Deploy Frontend to Render

1. Go to Render Dashboard → "New +" → "Static Site"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `foodexpress-frontend`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`

4. Add Environment Variable:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```
   (Replace with your actual backend URL from Step 2)

5. Click "Create Static Site"
6. Wait for deployment

## Step 4: Deploy Admin Panel to Render

1. Go to Render Dashboard → "New +" → "Static Site"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `foodexpress-admin`
   - **Build Command**: `cd admin && npm install && npm run build`
   - **Publish Directory**: `admin/dist`

4. Add Environment Variable:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```
   (Same backend URL as frontend)

5. Click "Create Static Site"
6. Wait for deployment

## Step 5: Update MongoDB Atlas Network Access

1. Go to MongoDB Atlas → Network Access
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (or add Render's IP ranges)
4. Save

## Step 6: Configure Stripe (Optional but Recommended)

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Get your API keys (use Live keys for production)
3. Update `STRIPE_SECRET_KEY` in Render backend environment variables
4. Update Stripe webhook URLs if needed

## Step 7: Test Your Deployment

1. Visit your frontend URL
2. Visit your admin panel URL
3. Test user registration/login
4. Test adding items to cart
5. Test placing an order (if Stripe is configured)

## Alternative: Deploy to Vercel

### Backend (Vercel Serverless Functions)

Vercel is better for frontend, but backend can be deployed as serverless functions.

### Frontend & Admin to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. In `frontend` directory:
   ```bash
   vercel
   ```
3. Add environment variable `VITE_API_URL` in Vercel dashboard
4. Repeat for `admin` directory

## Environment Variables Summary

### Backend (.env)
```env
MONGO_URI=mongodb+srv://pr2928272625_db_user:YOUR_ACTUAL_PASSWORD@foodexpress.4ctdzcm.mongodb.net/foodexpress?appName=FoodExpress
PORT=4000
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=sk_live_your_stripe_key
NODE_ENV=production
```
**Note:** Replace `YOUR_ACTUAL_PASSWORD` with your actual MongoDB password

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

### Admin (.env)
```env
VITE_API_URL=https://your-backend-url.onrender.com
```

## Troubleshooting

### Backend Issues
- Check MongoDB connection string format
- Verify network access in MongoDB Atlas
- Check Render logs for errors
- Ensure `MONGO_URI` includes database name

### Frontend/Admin Issues
- Verify `VITE_API_URL` is set correctly
- Rebuild after changing environment variables
- Check browser console for CORS errors
- Ensure backend CORS allows your frontend domain

### Common Errors
- **"DB Connection Error"**: Check MongoDB URI and network access
- **"CORS Error"**: Update backend CORS settings to include frontend URL
- **"404 on API calls"**: Verify `VITE_API_URL` matches backend URL exactly

## Post-Deployment Checklist

- [ ] Backend is accessible and returns "API Working"
- [ ] Frontend loads and can connect to backend
- [ ] Admin panel loads and can connect to backend
- [ ] User registration/login works
- [ ] Food items display correctly
- [ ] Cart functionality works
- [ ] Orders can be placed (if Stripe configured)
- [ ] MongoDB connection is stable

## Notes

- Render free tier may spin down after inactivity (15 min sleep)
- Consider upgrading for production use
- Keep environment variables secure
- Never commit `.env` files to GitHub
- Use strong JWT secrets in production

## Support

If you encounter issues:
1. Check Render/Vercel deployment logs
2. Check browser console for errors
3. Verify all environment variables are set
4. Test API endpoints directly using Postman/curl

