# 🚀 Deployment Scripts

## **Frontend Deployment (Vercel)**

```bash
#!/bin/bash
echo "🚀 Deploying Frontend to Vercel..."

# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Build for production
npm run build

# Deploy to Vercel
vercel --prod

echo "✅ Frontend deployed successfully!"
```

## **Backend Deployment (Railway)**

```bash
#!/bin/bash
echo "🚀 Deploying Backend to Railway..."

# Navigate to backend
cd backend

# Install dependencies
npm install

# Deploy to Railway
railway up

# Seed database
railway run npm run seed

echo "✅ Backend deployed successfully!"
```

## **Full Deployment Script**

```bash
#!/bin/bash
echo "🚀 Full Stack Deployment..."

# Deploy Backend
echo "📦 Deploying Backend..."
cd backend
railway up
railway run npm run seed

# Get Railway URL
BACKEND_URL=$(railway domain)
echo "Backend URL: $BACKEND_URL"

# Deploy Frontend
echo "🎨 Deploying Frontend..."
cd ../frontend
npm run build

# Update frontend API URL
echo "VITE_API_URL=https://$BACKEND_URL" > .env.production

# Deploy to Vercel
vercel --prod

echo "🎉 Full stack deployed successfully!"
echo "Frontend: https://your-app.vercel.app"
echo "Backend: https://$BACKEND_URL"
```

## **Environment Setup**

```bash
# Frontend Environment
cd frontend
echo "VITE_API_URL=https://your-backend.railway.app" > .env.production

# Backend Environment (Railway Dashboard)
# DATABASE_URL=postgresql://...
# PORT=3000
# NODE_ENV=production
```

## **Quick Deploy Commands**

```bash
# Install CLI tools
npm install -g vercel railway

# Login to services
vercel login
railway login

# Deploy both services
./deploy-full.sh
```

## **Health Check After Deployment**

```bash
# Test backend health
curl https://your-backend.railway.app/health

# Test frontend
curl https://your-app.vercel.app

# Test API integration
curl https://your-backend.railway.app/api/clients
```
