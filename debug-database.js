const https = require('https');

function testAPI() {
  return new Promise((resolve, reject) => {
    const url = `https://saas-intelligence.onrender.com/api/clients`;
    
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

async function debugDatabase() {
  try {
    console.log('🔍 Testing API endpoint...');
    
    const response = await testAPI();
    
    console.log('✅ API Response:');
    console.log('- Success:', response.success);
    console.log('- Message:', response.message);
    console.log('- Data length:', response.data ? response.data.length : 0);
    
    if (response.data && response.data.length > 0) {
      console.log('\n📊 First client sample:');
      const client = response.data[0];
      console.log('- ID:', client.id);
      console.log('- Name:', client.name);
      console.log('- Industry:', client.industry);
      console.log('- Score:', client.score);
      console.log('- Has details:', !!client.details);
      console.log('- Offering count:', client.details?.offerings?.length || 0);
    } else {
      console.log('❌ No clients returned');
      console.log('Full response:', JSON.stringify(response, null, 2));
    }
    
  } catch (error) {
    console.error('❌ API Error:', error.message);
  }
}

debugDatabase();
