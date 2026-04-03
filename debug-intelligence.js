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

async function debugClients() {
  try {
    console.log('🔍 Testing client intelligence...');
    
    // Test CloudMesh (synthetic)
    console.log('\n📊 CloudMesh (ID: 1):');
    const cloudMesh = await testClient(1);
    if (cloudMesh.data.intelligence) {
      console.log('- Strengths:', cloudMesh.data.intelligence.strengths?.length || 0, 'items');
      console.log('- Weaknesses:', cloudMesh.data.intelligence.weaknesses?.length || 0, 'items');
      console.log('- Risks:', cloudMesh.data.intelligence.risks?.length || 0, 'items');
      console.log('- Opportunities:', cloudMesh.data.intelligence.opportunities?.length || 0, 'items');
    } else {
      console.log('❌ No intelligence data');
    }
    
    // Test a real client (ID: 6)
    console.log('\n📊 Real Client (ID: 6):');
    const realClient = await testClient(6);
    if (realClient.data.intelligence) {
      console.log('- Strengths:', realClient.data.intelligence.strengths?.length || 0, 'items');
      console.log('- Weaknesses:', realClient.data.intelligence.weaknesses?.length || 0, 'items');
      console.log('- Risks:', realClient.data.intelligence.risks?.length || 0, 'items');
      console.log('- Opportunities:', realClient.data.intelligence.opportunities?.length || 0, 'items');
      console.log('- Sample strengths:', realClient.data.intelligence.strengths?.slice(0, 2));
      console.log('- Sample weaknesses:', realClient.data.intelligence.weaknesses?.slice(0, 2));
    } else {
      console.log('❌ No intelligence data');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

debugClients();
