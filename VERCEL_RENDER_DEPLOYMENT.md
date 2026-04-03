# 🚀 Vercel + Render Deployment Guide

## 📋 **Architecture**
- **Frontend**: Vercel (React + Vite) - FREE
- **Backend**: Render (Node.js + Express) - FREE
- **Database**: Neon PostgreSQL - FREE

---

## 🎯 **Step-by-Step Deployment**

### **Step 1: Deploy Backend to Render**

#### **1.1 Create Render Account**
1. Go to [render.com](https://render.com)
2. Sign up with GitHub/Google
3. Choose FREE plan

#### **1.2 Connect Your GitHub Repository**
1. Click "New +" → "Web Service"
2. Connect your GitHub repository: `karthii99/SaaS_intelligence`
3. Configure as follows:

**Service Configuration:**
- **Name**: `saas-intelligence-api`
- **Environment**: `Node`
- **Region**: `US East` (or closest to you)
- **Branch**: `main`
- **Root Directory**: `backend`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

#### **1.3 Set Environment Variables**
In Render dashboard, add these environment variables:
- `DATABASE_URL` = `postgresql://neondb_owner:npg_NsJrtBho17gH@ep-flat-pond-a13oi1ak-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
- `NODE_ENV` = `production`
- `PORT` = `3000`

#### **1.4 Deploy Backend**
1. Click "Create Web Service"
2. Wait for deployment (2-3 minutes)
3. Copy your Render URL: `https://your-backend-name.onrender.com`

#### **1.5 Seed the Database**
1. Go to your service dashboard
2. Click "Shell" tab
3. Run: `npm run seed`

### **Step 2: Deploy Frontend to Vercel**

#### **2.1 Install Vercel CLI**
```bash
npm install -g vercel
```

#### **2.2 Login to Vercel**
```bash
vercel login
```

#### **2.3 Navigate to Frontend Directory**
```bash
cd frontend
```

#### **2.4 Update Production API URL**
Edit `.env.production` file:
```bash
# Replace with your actual Render URL from Step 1.4
echo "VITE_API_URL=https://your-backend-name.onrender.com" > .env.production
```

#### **2.5 Build Frontend**
```bash
npm run build
```

#### **2.6 Deploy Frontend**
```bash
vercel --prod
```

#### **2.7 Set Environment Variable in Vercel**
When prompted, set:
- `VITE_API_URL` = `https://your-backend-name.onrender.com`

---

## 🌐 **Production URLs**

After deployment:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend-name.onrender.com`
- **API**: `https://your-backend-name.onrender.com/api/clients`
- **Health**: `https://your-backend-name.onrender.com/health`

---

## 🧪 **Testing After Deployment**

### **1. Test Backend Health**
```bash
curl https://your-backend-name.onrender.com/health
```
*Should return: `{"success": true, "status": "ok"}`*

### **2. Test API**
```bash
curl https://your-backend-name.onrender.com/api/clients
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
- Check Render logs in dashboard
- Verify environment variables
- Ensure database URL is correct
- Check if service is "Live" (not "Build Failed")

### **If Frontend Fails:**
- Check build: `npm run build`
- Verify `VITE_API_URL` in `.env.production`
- Check Vercel logs

### **If Integration Fails:**
- Test API endpoints directly
- Check CORS configuration (already set for `.onrender.com`)
- Verify both services are running

---

## 🎉 **Quick Commands Summary**

```bash
# Backend Deployment (via Render dashboard)
# 1. Go to render.com → New → Web Service
# 2. Connect GitHub repo: karthii99/SaaS_intelligence
# 3. Set root directory: backend
# 4. Set environment variables
# 5. Deploy and copy URL

# Seed Database (in Render Shell)
npm run seed

# Frontend Deployment
npm install -g vercel
vercel login
cd frontend
echo "VITE_API_URL=https://your-backend-name.onrender.com" > .env.production
npm run build
vercel --prod
```

---

## 📊 **Expected Results**

After successful deployment:
- **Frontend**: `https://your-app.vercel.app` - Full SaaS Intelligence Portal
- **Backend**: `https://your-backend-name.onrender.com` - API endpoints
- **Database**: Neon PostgreSQL with seeded data
- **Integration**: Working API calls between frontend and backend

---

## 🚀 **Ready to Deploy!**

Your SaaS Intelligence Portal is configured for **Vercel + Render deployment**:

- ✅ Frontend ready for Vercel (FREE)
- ✅ Backend ready for Render (FREE)
- ✅ CORS configured for cross-origin
- ✅ Environment variables ready
- ✅ Database connection ready
- ✅ Render configuration file created

**Start with Step 1 - deploy the backend to Render!** 🎉

## 💡 **Why Render?**
- **Free tier** with no credit card required
- **Always-on** backend (no sleep like Railway free tier)
- **Easy GitHub integration**
- **Built-in database support**
- **Custom domains available**
