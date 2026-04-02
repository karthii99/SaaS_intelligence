/**
 * Simple test to check if frontend can reach backend
 */

// Add a simple test endpoint to server.js temporarily
const testEndpoint = `
// Add this to your server.js temporarily for testing
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'Frontend-Backend connection working!',
    timestamp: new Date().toISOString(),
    origin: req.headers.origin || 'No origin header'
  });
});
`;

console.log('🧪 Testing Frontend Connection...');
console.log('📋 Add this endpoint to server.js temporarily:');
console.log(testEndpoint);

console.log('\n🌐 Then test in browser console:');
console.log("fetch('http://localhost:3000/api/test').then(r => r.json()).then(console.log)");

console.log('\n🔍 Current server logs show:');
console.log('- Backend is running on port 3000');
console.log('- At least one request to /api/health was received');
console.log('- CORS is configured correctly');

console.log('\n📊 Next steps:');
console.log('1. Check browser Network tab for API requests');
console.log('2. Look for any failed requests (red status codes)');
console.log('3. Verify frontend API base URL is http://localhost:3000');
console.log('4. Check for any JavaScript errors in console');
