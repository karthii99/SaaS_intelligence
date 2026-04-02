# 🚀 Vercel + Railway Deployment Guide

## 📋 **Architecture**
- **Frontend**: Vercel (React + Vite)
- **Backend**: Railway (Node.js + Express)
- **Database**: Neon PostgreSQL

---

## 🎯 **Step-by-Step Deployment**

### **Step 1: Deploy Backend to Railway**

#### **1.1 Install Railway CLI**
```bash
npm install -g @railway/cli
```

#### **1.2 Login to Railway**
```bash
railway login
```
*This will open a browser - login with your GitHub/Google account*

#### **1.3 Navigate to Backend Directory**
```bash
cd backend
```

#### **1.4 Deploy Backend**
```bash
railway up
```
*This will upload your backend code and deploy it*

#### **1.5 Get Your Backend URL**
```bash
railway domain
```
*Copy this URL - you'll need it for the frontend*

#### **1.6 Configure Environment Variables**
Go to your Railway dashboard and add these environment variables:
- `DATABASE_URL` = `postgresql://neondb_owner:npg_NsJrtBho17gH@ep-flat-pond-a13oi1ak-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
- `PORT` = `3000`
- `NODE_ENV` = `production`

#### **1.7 Seed the Database**
```bash
railway run npm run seed
```

### **Step 2: Deploy Frontend to Vercel**

#### **2.1 Install Vercel CLI**
```bash
npm install -g vercel
```

#### **2.2 Navigate to Frontend Directory**
```bash
cd ../frontend
```

#### **2.3 Update Production API URL**
Edit `.env.production` file:
```bash
# Replace with your actual Railway URL from Step 1.5
echo "VITE_API_URL=https://your-backend-name.railway.app" > .env.production
```

#### **2.4 Build Frontend**
```bash
npm run build
```

#### **2.5 Login to Vercel**
```bash
vercel login
```
*This will open a browser - login with your GitHub/Google account*

#### **2.6 Deploy Frontend**
```bash
vercel --prod
```

#### **2.7 Set Environment Variable in Vercel**
When prompted, set:
- `VITE_API_URL` = `https://your-backend-name.railway.app`

---

## 🌐 **Production URLs**

After deployment:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend-name.railway.app`
- **API**: `https://your-backend-name.railway.app/api/clients`
- **Health**: `https://your-backend-name.railway.app/health`

---

## 🧪 **Testing After Deployment**

### **1. Test Backend Health**
```bash
curl https://your-backend-name.railway.app/health
```
*Should return: `{"success": true, "status": "ok"}`*

### **2. Test API**
```bash
curl https://your-backend-name.railway.app/api/clients
```
*Should return the clients data*

### **3. Test Frontend**
Open your Vercel URL and verify:
- Dashboard loads with real data
- Search and filter work
- Click on client cards
- Detail pages load correctly

---

## 🚨 **Troubleshooting**

### **If Backend Fails:**
- Check Railway logs: `railway logs`
- Verify environment variables in Railway dashboard
- Ensure database URL is correct

### **If Frontend Fails:**
- Check build: `npm run build`
- Verify `VITE_API_URL` in `.env.production`
- Check Vercel logs

### **If Integration Fails:**
- Test API endpoints directly
- Check CORS configuration (already set for `.vercel.app`)
- Verify both services are running

---

## 🎉 **Quick Commands Summary**

```bash
# Backend Deployment
npm install -g @railway/cli
railway login
cd backend
railway up
railway domain  # Copy this URL
# Set env vars in Railway dashboard
railway run npm run seed

# Frontend Deployment
cd ../frontend
npm install -g vercel
vercel login
echo "VITE_API_URL=https://your-backend-name.railway.app" > .env.production
npm run build
vercel --prod
```

---

## 📊 **Expected Results**

After successful deployment:
- **Frontend**: `https://your-app.vercel.app` - Full SaaS Intelligence Portal
- **Backend**: `https://your-backend-name.railway.app` - API endpoints
- **Database**: Neon PostgreSQL with seeded data
- **Integration**: Working API calls between frontend and backend

---

## 🚀 **Ready to Deploy!**

Your SaaS Intelligence Portal is configured for **Vercel + Railway deployment**:

- ✅ Frontend ready for Vercel
- ✅ Backend ready for Railway
- ✅ CORS configured for cross-origin
- ✅ Environment variables ready
- ✅ Database connection ready

**Start with Step 1 - deploy the backend to Railway!** 🎉
