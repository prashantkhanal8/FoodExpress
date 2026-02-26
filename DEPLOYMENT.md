 Deployment (Render)

This guide outlines the steps to deploy FoodExpress using Render and MongoDB Atlas.

 What You Need

   MongoDB Atlas cluster
   Render account
   Stripe account (optional for payments)

 1. Deploy Backend

1.  Go to Render and create a new Web Service.
2.  Connect your repository.
3.  Use the following settings:

       Build Command: cd backend && npm install

       Start Command: cd backend && npm start
    
       Environment Variables:
    
           MONGOURI=yourmongodbconnectionstring
           JWTSECRET=anyrandomsecretkey
           STRIPESECRETKEY=yourstripesecretkey
           NODEENV=production
    
5.  Deploy and copy the backend URL.
       Example: https://foodexpress-backend.onrender.com

 2. Deploy Frontend

1.  Go to Render and create a new Static Site.
2.  Connect your repository.
3.  Use the following settings:

       Build Command: cd frontend && npm install && npm run build
    
       Publish Directory: frontend/dist
    
       Environment Variable: VITEAPIURL=https://your-backend-url.onrender.com
    
5.  Deploy.

 3. Deploy Admin Panel

1.  Follow the same steps as the frontend deployment.
   
       Build Command: cd admin && npm install && npm run build
    
       Publish Directory: admin/dist
    
       Environment Variable: VITEAPIURL=https://your-backend-url.onrender.com

 4. MongoDB Atlas Setup

1.  Go to Network Access in your MongoDB Atlas cluster.
2.  Allow access from anywhere (0.0.0.0/0).
3.  Ensure your database name matches the one in MONGOURI.
