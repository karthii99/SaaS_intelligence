# 🚀 SaaS Intelligence Portal - Deployment Guide

## 📋 **Deployment Overview**

This is a **Full-Stack Application** with:
- **Frontend**: React + Vite + TypeScript (Port 8080)
- **Backend**: Node.js + Express + PostgreSQL (Port 3000)
- **Database**: Neon PostgreSQL (Cloud)

---

## 🎯 **Deployment Options**

### **Option 1: Vercel + Railway (Recommended)**
- **Frontend**: Vercel (Free tier)
- **Backend**: Railway (Free tier)
- **Database**: Neon PostgreSQL (Free tier)

### **Option 2: Netlify + Render**
- **Frontend**: Netlify (Free tier)
- **Backend**: Render (Free tier)
- **Database**: Neon PostgreSQL (Free tier)

### **Option 3: AWS/Google Cloud**
- **Frontend**: S3 + CloudFront
- **Backend**: EC2/Cloud Run
- **Database**: RDS PostgreSQL

---

## 🔧 **Step-by-Step Deployment**

### **Step 1: Frontend Deployment (Vercel)**

#### **1.1 Prepare Frontend**
```bash
cd frontend
npm run build
```

#### **1.2 Deploy to Vercel**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### **1.3 Configure Environment**
Create `vercel.json` in frontend:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite"
}
```

### **Step 2: Backend Deployment (Railway)**

#### **2.1 Prepare Backend**
```bash
cd backend
npm install
```

#### **2.2 Deploy to Railway**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway up
```

#### **2.3 Configure Environment Variables**
In Railway dashboard, set:
- `DATABASE_URL` (from Neon)
- `PORT=3000`
- `NODE_ENV=production`

### **Step 3: Database Setup (Neon)**

#### **3.1 Create Neon Database**
1. Go to [neon.tech](https://neon.tech)
2. Create new project
3. Get connection string
4. Update Railway environment variables

#### **3.2 Seed Database**
```bash
# Run seeder after deployment
railway run npm run seed
```

---

## 🔗 **Connecting Frontend to Backend**

### **Update API URLs**
In `frontend/src/pages/Index.tsx` and `ClientDetail.tsx`:

```typescript
// Development
fetch("http://localhost:3000/api/clients")

// Production
fetch("https://your-backend-url.railway.app/api/clients")
```

### **Environment Configuration**
Create `.env.production` in frontend:
```env
VITE_API_URL=https://your-backend-url.railway.app
```

---

## 🛠️ **Production Configuration Files**

### **Frontend: vercel.json**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### **Backend: railway.json**
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "healthcheckPath": "/health"
  }
}
```

---

## 🔍 **Testing Deployment**

### **1. Backend Health Check**
```bash
curl https://your-backend-url.railway.app/health
```

### **2. Frontend Load Test**
Visit your Vercel URL and check:
- Dashboard loads with real data
- Search and filter work
- Client detail pages load
- No console errors

### **3. Integration Test**
- Click client cards
- Verify API calls work
- Check CORS is configured

---

## 🚨 **Common Issues & Fixes**

### **CORS Issues**
```javascript
// In backend/server.js - Already configured
app.use(cors({
  origin: ["https://your-vercel-app.vercel.app"],
  credentials: true
}));
```

### **Database Connection**
```bash
# Test connection string
psql "postgresql://user:pass@host/db?sslmode=require"
```

### **Environment Variables**
```bash
# Verify all required variables
echo $DATABASE_URL
echo $PORT
echo $NODE_ENV
```

---

## 📊 **Production URLs Example**

After deployment:
- **Frontend**: `https://saas-intelligence.vercel.app`
- **Backend**: `https://saas-intelligence.railway.app`
- **Health Check**: `https://saas-intelligence.railway.app/health`
- **API**: `https://saas-intelligence.railway.app/api/clients`

---

## 🎯 **Deployment Checklist**

### **Pre-Deployment**
- [ ] Frontend builds successfully
- [ ] Backend starts without errors
- [ ] Database connection works
- [ ] All endpoints tested locally
- [ ] Environment variables documented

### **Post-Deployment**
- [ ] Frontend loads at URL
- [ ] Backend health check passes
- [ ] Database seeded with data
- [ ] API endpoints accessible
- [ ] Frontend-backend integration works
- [ ] No console errors
- [ ] All features functional

---

## 🚀 **Ready to Deploy!**

Your SaaS Intelligence Portal is **production-ready** with:
- ✅ Professional UI/UX
- ✅ Full API integration
- ✅ Real database
- ✅ Error handling
- ✅ Decision-support features

**Follow this guide to go live!** 🎉
