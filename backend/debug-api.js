/**
 * Debug API response to see exact data structure
 */

async function debugAPI() {
  try {
    const response = await fetch('http://localhost:3000/api/clients');
    const data = await response.json();
    
    console.log('🔍 API Response Analysis:');
    console.log('✅ Success:', data.success);
    console.log('📊 Total Companies:', data.data?.length || 0);
    
    if (data.data && data.data.length > 0) {
      console.log('\n🏢 Company Details:');
      data.data.forEach((company, index) => {
        console.log(`${index + 1}. ID: ${company.id}, Name: ${company.name}`);
        console.log(`   Overview: "${company.overview_short || 'EMPTY'}"`);
        console.log(`   Details: ${company.details ? 'EXISTS' : 'MISSING'}`);
        console.log('');
      });
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

debugAPI();
