const https = require('https');

function testClientDetail(clientId) {
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

async function debugScoresDetailed() {
  try {
    console.log('🔍 Testing score breakdown in detail API...');
    
    // Test real client (ID: 6)
    console.log('\n📊 Real Client (ID: 6):');
    const realClient = await testClientDetail(6);
    
    if (realClient.data && realClient.data.intelligence) {
      const intel = realClient.data.intelligence;
      console.log('✅ Intelligence object found');
      console.log('- Overall Score:', intel.overall_score);
      console.log('- Positioning:', intel.positioning);
      console.log('- Verdict:', intel.verdict);
      console.log('- Key Takeaway:', intel.key_takeaway);
      
      if (intel.scores) {
        console.log('\n📈 Score Breakdown:');
        console.log('- Differentiation:', intel.scores.differentiation);
        console.log('- Market:', intel.scores.market);
        console.log('- Product:', intel.scores.product);
        console.log('- Pricing:', intel.scores.pricing);
        console.log('- Moat:', intel.scores.moat);
      } else {
        console.log('❌ NO SCORES OBJECT FOUND');
      }
      
      console.log('\n📋 Arrays:');
      console.log('- Strengths:', intel.strengths?.length || 0, 'items');
      console.log('- Weaknesses:', intel.weaknesses?.length || 0, 'items');
      console.log('- Risks:', intel.risks?.length || 0, 'items');
      console.log('- Opportunities:', intel.opportunities?.length || 0, 'items');
    } else {
      console.log('❌ No intelligence data found');
      console.log('Response:', JSON.stringify(realClient, null, 2));
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

debugScoresDetailed();
