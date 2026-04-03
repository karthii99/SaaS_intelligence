const fetch = require('node-fetch');

async function testWeakness() {
  try {
    console.log('🔍 Testing weakness data...');
    
    const response = await fetch('https://saas-intelligence.onrender.com/api/clients/1');
    const data = await response.json();
    
    console.log('✅ API Response:');
    console.log('- Client:', data.data.client.name);
    console.log('- Intelligence:', data.data.intelligence);
    
    if (data.data.intelligence) {
      console.log('\n📊 Intelligence Fields:');
      console.log('- Strengths:', data.data.intelligence.strengths || 'MISSING');
      console.log('- Weaknesses:', data.data.intelligence.weaknesses || 'MISSING');
      console.log('- Risks:', data.data.intelligence.risks || 'MISSING');
      console.log('- Opportunities:', data.data.intelligence.opportunities || 'MISSING');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testWeakness();
