# Quick Deployment Checklist

Follow these steps to deploy your FoodExpress app:

## ✅ Pre-Deployment Setup (Already Done)
- [x] Code pushed to GitHub
- [x] MongoDB Atlas cluster created
- [x] Database "foodexpress" created

## 📋 Step-by-Step Deployment

### 1. Get Your MongoDB Connection String
- Your MongoDB URI: `mongodb+srv://pr2928272625_db_user:<db_password>@foodexpress.4ctdzcm.mongodb.net/foodexpress?appName=FoodExpress`
- Replace `<db_password>` with your actual database password
- The database name `foodexpress` is already included in the URI

### 2. Deploy Backend to Render
1. Go to [render.com](https://render.com) and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `foodexpress-backend`
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
5. Add Environment Variables:
   ```
   MONGO_URI=mongodb+srv://pr2928272625_db_user:YOUR_ACTUAL_PASSWORD@foodexpress.4ctdzcm.mongodb.net/foodexpress?appName=FoodExpress
   JWT_SECRET=<generate a strong random string>
   STRIPE_SECRET_KEY=sk_test_your_key (get from Stripe dashboard - see note below)
   FRONTEND_URL=https://your-frontend-url.onrender.com (set after deploying frontend in step 3)
   PORT=4000
   NODE_ENV=production
   ```
   **Important:** 
   - Replace `YOUR_ACTUAL_PASSWORD` with your actual MongoDB password
   - Get your Stripe keys from https://dashboard.stripe.com/apikeys (create account if needed)
   - Update `FRONTEND_URL` after you deploy the frontend (step 3)
6. Click "Create Web Service"
7. **Wait for deployment** and copy your backend URL (e.g., `https://foodexpress-backend.onrender.com`)

### 3. Deploy Frontend to Render
1. Click "New +" → "Static Site"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `foodexpress-frontend`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`
4. Add Environment Variable:
   ```
   VITE_API_URL=<your-backend-url-from-step-2>
   ```
5. Click "Create Static Site"

### 4. Deploy Admin Panel to Render
1. Click "New +" → "Static Site"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `foodexpress-admin`
   - **Build Command**: `cd admin && npm install && npm run build`
   - **Publish Directory**: `admin/dist`
4. Add Environment Variable:
   ```
   VITE_API_URL=<your-backend-url-from-step-2>
   ```
5. Click "Create Static Site"

### 5. Configure MongoDB Atlas Network Access
1. Go to MongoDB Atlas → Network Access
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (or add specific IPs)
4. Save

### 6. Test Your Deployment
- Visit your frontend URL
- Visit your admin panel URL
- Test registration/login
- Test adding items to cart

## 🔑 Generating JWT Secret

**Windows PowerShell:**
```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

**Linux/Mac:**
```bash
openssl rand -base64 32
```

## 📝 Important Notes

- Render free tier may sleep after 15 minutes of inactivity
- First deployment may take 5-10 minutes
- After adding environment variables, services auto-redeploy
- Keep your MongoDB password and JWT secret secure
- Never commit `.env` files to GitHub

## 🆘 Troubleshooting

**Backend not connecting to MongoDB:**
- Check MongoDB connection string format
- Verify network access in MongoDB Atlas
- Check Render logs for errors

**Frontend can't connect to backend:**
- Verify `VITE_API_URL` matches backend URL exactly
- Check browser console for CORS errors
- Rebuild frontend after changing environment variables

**Services not deploying:**
- Check build logs in Render dashboard
- Verify all environment variables are set
- Check that package.json files are correct

## 📚 More Details

See `DEPLOYMENT.md` for detailed instructions and `ENV_SETUP.md` for environment variable details.

