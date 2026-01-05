# 🚀 What to Do After Pushing to GitHub

This guide walks you through deploying your FoodExpress app to Render after pushing to GitHub.

## ✅ Step 1: Verify GitHub Push

Make sure your code is pushed to GitHub:
```bash
git add .
git commit -m "Initial commit - FoodExpress deployment ready"
git push origin main
```

## 🎯 Step 2: Deploy Backend to Render

### 2.1 Create Render Account
1. Go to [https://render.com](https://render.com)
2. Sign up with GitHub (recommended - easier connection)

### 2.2 Create Backend Web Service
1. Click **"New +"** → **"Web Service"**
2. Click **"Connect account"** if prompted, then **"Connect GitHub"**
3. Select your **FoodExpress repository**
4. Click **"Connect"**

### 2.3 Configure Backend Service
Fill in these settings:

**Basic Settings:**
- **Name**: `foodexpress-backend`
- **Region**: Choose closest to you (e.g., `Oregon (US West)`)
- **Branch**: `main` (or your default branch)
- **Root Directory**: Leave empty
- **Environment**: `Node`
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && npm start`

**Advanced Settings (click "Advanced"):**
- **Auto-Deploy**: `Yes` (deploys on every push)

### 2.4 Add Environment Variables
Click **"Add Environment Variable"** and add these one by one:

```
MONGO_URI=mongodb+srv://pr2928272625_db_user:tXf_3qPiV5U_.Ar@foodexpress.4ctdzcm.mongodb.net/foodexpress?appName=FoodExpress
```

```
JWT_SECRET=aKwwQXlzy0wlc+RfrQtzXwDC9FhcDjFFn5Ssegqxv3I=
```

```
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
```

```
PORT=4000
```

```
NODE_ENV=production
```

```
FRONTEND_URL=https://your-frontend-url.onrender.com
```
*(Leave this for now - update after deploying frontend)*

### 2.5 Create and Deploy
1. Scroll down and click **"Create Web Service"**
2. Wait 5-10 minutes for first deployment
3. **Copy your backend URL** (e.g., `https://foodexpress-backend.onrender.com`)
4. Test it: Visit the URL - should see "API Working"

## 🎨 Step 3: Deploy Frontend to Render

### 3.1 Create Frontend Static Site
1. In Render dashboard, click **"New +"** → **"Static Site"**
2. Connect your **FoodExpress repository** (if not already connected)

### 3.2 Configure Frontend Service
Fill in these settings:

**Basic Settings:**
- **Name**: `foodexpress-frontend`
- **Branch**: `main`
- **Root Directory**: Leave empty
- **Build Command**: `cd frontend && npm install && npm run build`
- **Publish Directory**: `frontend/dist`

**Environment Variables:**
Click **"Add Environment Variable"**:
```
VITE_API_URL=https://foodexpress-backend.onrender.com
```
*(Replace with your actual backend URL from Step 2.5)*

### 3.3 Create and Deploy
1. Click **"Create Static Site"**
2. Wait 3-5 minutes for deployment
3. **Copy your frontend URL** (e.g., `https://foodexpress-frontend.onrender.com`)

### 3.4 Update Backend FRONTEND_URL
1. Go back to your backend service in Render
2. Go to **"Environment"** tab
3. Find `FRONTEND_URL` and update it with your frontend URL
4. Save (auto-redeploys)

## 👨‍💼 Step 4: Deploy Admin Panel to Render

### 4.1 Create Admin Static Site
1. Click **"New +"** → **"Static Site"**
2. Connect your **FoodExpress repository**

### 4.2 Configure Admin Service
Fill in these settings:

**Basic Settings:**
- **Name**: `foodexpress-admin`
- **Branch**: `main`
- **Root Directory**: Leave empty
- **Build Command**: `cd admin && npm install && npm run build`
- **Publish Directory**: `admin/dist`

**Environment Variables:**
```
VITE_API_URL=https://foodexpress-backend.onrender.com
```
*(Same backend URL as frontend)*

### 4.3 Create and Deploy
1. Click **"Create Static Site"**
2. Wait 3-5 minutes for deployment
3. **Copy your admin URL**

## 🔒 Step 5: Configure MongoDB Atlas Network Access

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click **"Network Access"** in left sidebar
3. Click **"Add IP Address"**
4. Click **"Allow Access from Anywhere"** (or add Render's IP ranges)
5. Click **"Confirm"**

## ✅ Step 6: Test Your Deployment

### Test Backend:
- Visit: `https://foodexpress-backend.onrender.com`
- Should see: "API Working"

### Test Frontend:
- Visit your frontend URL
- Try registering a new user
- Try logging in
- Browse food items
- Add items to cart

### Test Admin Panel:
- Visit your admin URL
- Try logging in (if you have admin credentials)
- View orders
- Add/edit food items

## 📋 Quick Reference - Your URLs

After deployment, you'll have:
- **Backend**: `https://foodexpress-backend.onrender.com`
- **Frontend**: `https://foodexpress-frontend.onrender.com`
- **Admin**: `https://foodexpress-admin.onrender.com`

## 🆘 Troubleshooting

### Backend Issues:
- **"DB Connection Error"**: Check MongoDB network access, verify MONGO_URI
- **"Cannot GET /"**: Check Render logs, verify start command
- **Port issues**: Render sets PORT automatically, don't override

### Frontend Issues:
- **"Cannot connect to backend"**: Verify VITE_API_URL matches backend URL exactly
- **CORS errors**: Backend CORS is configured, check FRONTEND_URL in backend env vars
- **Build fails**: Check build logs, verify Node version

### Common Fixes:
1. Check Render logs: Click service → "Logs" tab
2. Verify all environment variables are set
3. Rebuild after changing env vars (auto-rebuilds)
4. Check MongoDB Atlas → Network Access

## 🎉 You're Done!

Your FoodExpress app should now be live! Share your frontend URL with users.

## 📝 Next Steps (Optional)

- Set up custom domain (Render → Settings → Custom Domain)
- Enable auto-deploy from GitHub (already enabled by default)
- Monitor logs and errors in Render dashboard
- Set up Stripe webhooks for production payments

