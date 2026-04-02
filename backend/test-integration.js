/**
 * Quick Integration Test Script
 * Run this to verify backend is ready for frontend integration
 */

require('dotenv').config();

const BASE_URL = process.env.BACKEND_URL || 'http://localhost:3000';

async function testEndpoint(path, description) {
  try {
    console.log(`\n🧪 Testing: ${description}`);
    console.log(`📡 Request: ${BASE_URL}${path}`);
    
    const response = await fetch(`${BASE_URL}${path}`);
    const data = await response.json();
    
    console.log(`✅ Status: ${response.status}`);
    console.log(`📦 Response:`, JSON.stringify(data, null, 2));
    
    return { success: response.ok, data };
  } catch (error) {
    console.log(`❌ Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function runIntegrationTests() {
  console.log('🚀 Starting Backend Integration Tests');
  console.log(`🌐 Target: ${BASE_URL}`);
  
  const tests = [
    {
      path: '/api/health',
      description: 'Health Check'
    },
    {
      path: '/api/clients/seed',
      method: 'POST',
      description: 'Database Seeding'
    },
    {
      path: '/api/clients',
      description: 'Get Client List'
    },
    {
      path: '/api/clients/1',
      description: 'Get Client Details'
    },
    {
      path: '/api/clients?search=DataSync',
      description: 'Search Clients'
    },
    {
      path: '/api/clients?industry=Data%20Analytics',
      description: 'Filter by Industry'
    }
  ];
  
  let passed = 0;
  let failed = 0;
  
  for (const test of tests) {
    const result = test.method === 'POST' 
      ? await testEndpoint(test.path, test.description, 'POST')
      : await testEndpoint(test.path, test.description);
    
    if (result.success) {
      passed++;
      console.log('✅ PASSED');
    } else {
      failed++;
      console.log('❌ FAILED');
    }
  }
  
  console.log('\n📊 Test Results:');
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Success Rate: ${Math.round((passed / (passed + failed)) * 100)}%`);
  
  if (failed === 0) {
    console.log('\n🎉 Backend is ready for frontend integration!');
  } else {
    console.log('\n⚠️  Fix the failed tests before integrating with frontend.');
  }
}

// Check dependencies and run tests
async function checkDependencies() {
  console.log('📦 Using built-in fetch (Node.js 18+)');
  console.log('� Starting integration tests...');
  await runIntegrationTests();
}

// Run tests if called directly
if (require.main === module) {
  checkDependencies().catch(console.error);
}

module.exports = { testEndpoint, runIntegrationTests };
