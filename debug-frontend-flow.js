const https = require('https');

// Simulate the exact frontend fetch with cache-busting
function fetchLikeFrontend() {
  return new Promise((resolve, reject) => {
    const apiUrl = "https://saas-intelligence.onrender.com";
    const timestamp = new Date().getTime();
    const url = `${apiUrl}/api/clients?t=${timestamp}`;
    
    console.log('🔗 Simulating frontend fetch...');
    console.log('🌐 URL:', url);
    
    const req = https.get(url, (res) => {
      console.log('📡 Response status:', res.statusCode);
      console.log('📋 Response headers:', res.headers);
      
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          console.log('✅ JSON parsed successfully');
          console.log('📊 Response keys:', Object.keys(parsed));
          resolve(parsed);
        } catch (err) {
          console.error('❌ JSON parse error:', err.message);
          console.log('🔍 Raw response:', data.substring(0, 200));
          reject(err);
        }
      });
    });
    
    req.on('error', (err) => {
      console.error('❌ Request error:', err.message);
      reject(err);
    });
    
    req.setTimeout(10000, () => {
      console.error('❌ Request timeout');
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

// Test CORS headers
function testCORS() {
  return new Promise((resolve, reject) => {
    const url = 'https://saas-intelligence.onrender.com/api/clients';
    
    const req = https.get(url, (res) => {
      console.log('\n🔒 CORS Headers:');
      console.log('- Access-Control-Allow-Origin:', res.headers['access-control-allow-origin']);
      console.log('- Access-Control-Allow-Methods:', res.headers['access-control-allow-methods']);
      console.log('- Access-Control-Allow-Headers:', res.headers['access-control-allow-headers']);
      console.log('- Access-Control-Allow-Credentials:', res.headers['access-control-allow-credentials']);
      resolve();
    });
    
    req.on('error', reject);
  });
}

async function debugFrontendFlow() {
  try {
    console.log('🚀 Starting comprehensive frontend flow debug...\n');
    
    // Test 1: Basic API call
    console.log('=== Test 1: Basic API Call ===');
    const response = await fetchLikeFrontend();
    
    console.log('\n=== Test 2: Response Analysis ===');
    console.log('Success:', response.success);
    console.log('Message:', response.message);
    console.log('Data type:', typeof response.data);
    console.log('Data is array:', Array.isArray(response.data));
    console.log('Data length:', response.data?.length || 0);
    
    if (response.data && response.data.length > 0) {
      console.log('\n=== Test 3: First Client Structure ===');
      const client = response.data[0];
      console.log('Client keys:', Object.keys(client));
      console.log('ID:', client.id);
      console.log('Name:', client.name);
      console.log('Industry:', client.industry);
      console.log('Score:', client.score);
      console.log('Has details:', !!client.details);
      
      if (client.details) {
        console.log('Details keys:', Object.keys(client.details));
        console.log('Offerings count:', client.details.offerings?.length || 0);
        console.log('Capabilities count:', client.details.capabilities?.length || 0);
      }
    }
    
    // Test 4: CORS
    console.log('\n=== Test 4: CORS Headers ===');
    await testCORS();
    
    console.log('\n✅ Debug complete!');
    
  } catch (error) {
    console.error('\n❌ Debug failed:', error.message);
    console.error('Stack:', error.stack);
  }
}

debugFrontendFlow();
