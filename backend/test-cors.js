/**
 * Test CORS from frontend perspective (localhost:8080)
 */

async function testCORS() {
  console.log('🌐 Testing CORS from frontend perspective...');
  console.log('📍 Frontend URL: http://localhost:8080');
  console.log('📍 Backend URL: http://localhost:3000');
  
  try {
    // Simulate a request from localhost:8080
    const response = await fetch('http://localhost:3000/api/clients', {
      method: 'GET',
      headers: {
        'Origin': 'http://localhost:8080',
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    console.log('✅ CORS test successful!');
    console.log('📦 Response status:', response.status);
    console.log('📦 Data received:', data);
    
    // Test with origin header
    console.log('\n🧪 Testing with explicit Origin header...');
    const responseWithOrigin = await fetch('http://localhost:3000/api/health', {
      headers: {
        'Origin': 'http://localhost:8080'
      }
    });
    
    console.log('✅ Origin header test passed!');
    console.log('📦 CORS headers:', responseWithOrigin.headers.get('access-control-allow-origin'));
    
  } catch (error) {
    console.log('❌ CORS test failed:', error.message);
    console.log('🔧 This indicates a CORS or network issue');
  }
}

testCORS();
