/**
 * Debug script to test frontend-backend connection
 */

require('dotenv').config();

async function testConnection() {
  console.log('🔍 Testing Backend Connection...');
  console.log('📍 Backend URL: http://localhost:3000');
  
  try {
    const response = await fetch('http://localhost:3000/api/health');
    const data = await response.json();
    
    console.log('✅ Backend is reachable!');
    console.log('📦 Response:', data);
    console.log('🌐 Frontend should connect to: http://localhost:3000');
    
    console.log('\n🔧 Troubleshooting Checklist:');
    console.log('1. Frontend API base URL should be: http://localhost:3000');
    console.log('2. Frontend should make requests to:');
    console.log('   - GET http://localhost:3000/api/clients');
    console.log('   - GET http://localhost:3000/api/clients/:id');
    console.log('   - POST http://localhost:3000/api/clients/seed');
    console.log('3. Check browser console for CORS errors');
    console.log('4. Check browser Network tab for failed requests');
    
  } catch (error) {
    console.log('❌ Backend connection failed:', error.message);
    console.log('🔧 Make sure backend is running: npm run dev');
  }
}

testConnection();
