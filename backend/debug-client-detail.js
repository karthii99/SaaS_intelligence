/**
 * Debug client detail API response structure
 */

async function debugClientDetail() {
  try {
    console.log('🔍 Testing Client Detail API...');
    
    const response = await fetch('http://localhost:3000/api/clients/6');
    const data = await response.json();
    
    console.log('✅ Success:', data.success);
    console.log('📊 Data Structure:');
    
    if (data.data) {
      console.log('\n🏢 Client:');
      console.log('- ID:', data.data.client?.id);
      console.log('- Name:', data.data.client?.name);
      console.log('- Industry:', data.data.client?.industry);
      console.log('- Overview:', data.data.client?.overview?.substring(0, 50) + '...');
      
      console.log('\n🧠 Intelligence:');
      const intel = data.data.intelligence;
      if (intel) {
        console.log('- Overall Score:', intel.overall_score);
        console.log('- Positioning:', intel.positioning);
        console.log('- Verdict:', intel.verdict);
        console.log('- Key Takeaway:', intel.key_takeaway?.substring(0, 50) + '...');
        console.log('- Strengths:', intel.strengths ? `${intel.strengths.length} items` : 'MISSING');
        console.log('- Risks:', intel.risks ? `${intel.risks.length} items` : 'MISSING');
        console.log('- Opportunities:', intel.opportunities ? `${intel.opportunities.length} items` : 'MISSING');
        console.log('- Weaknesses:', intel.weaknesses ? `${intel.weaknesses.length} items` : 'MISSING');
      } else {
        console.log('❌ Intelligence object missing');
      }
      
      console.log('\n📋 Details:');
      const details = data.data.details;
      if (details) {
        console.log('- Offerings:', details.offerings ? `${details.offerings.length} items` : 'MISSING');
        console.log('- Capabilities:', details.capabilities ? `${details.capabilities.length} items` : 'MISSING');
        console.log('- Benefits:', details.benefits ? `${details.benefits.length} items` : 'MISSING');
        console.log('- Differentiators:', details.differentiators ? `${details.differentiators.length} items` : 'MISSING');
        console.log('- Pricing:', details.pricing || 'MISSING');
      } else {
        console.log('❌ Details object missing');
      }
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

debugClientDetail();
