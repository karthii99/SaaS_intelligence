const https = require('https');

function testClient(clientId) {
  return new Promise((resolve, reject) => {
    const url = `https://saas-intelligence.onrender.com/api/clients/${clientId}`;
    
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve(parsed);
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function debugScores() {
  try {
    console.log('🔍 Testing client scores...');
    
    // Test CloudMesh (synthetic)
    console.log('\n📊 CloudMesh (ID: 1):');
    const cloudMesh = await testClient(1);
    const cloudIntel = cloudMesh.data.intelligence;
    console.log('- Overall Score:', cloudIntel.overall_score);
    console.log('- Differentiator Score:', cloudIntel.differentiator_score);
    console.log('- Market Score:', cloudIntel.market_score);
    console.log('- Product Score:', cloudIntel.product_score);
    console.log('- Pricing Score:', cloudIntel.pricing_score);
    console.log('- Moat Score:', cloudIntel.moat_score);
    
    // Test a real client (ID: 6)
    console.log('\n📊 Real Client (ID: 6):');
    const realClient = await testClient(6);
    const realIntel = realClient.data.intelligence;
    console.log('- Overall Score:', realIntel.overall_score);
    console.log('- Differentiator Score:', realIntel.differentiator_score);
    console.log('- Market Score:', realIntel.market_score);
    console.log('- Product Score:', realIntel.product_score);
    console.log('- Pricing Score:', realIntel.pricing_score);
    console.log('- Moat Score:', realIntel.moat_score);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

debugScores();
