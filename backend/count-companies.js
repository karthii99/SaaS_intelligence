/**
 * Count companies in the database
 */

async function countCompanies() {
  try {
    const response = await fetch('http://localhost:3000/api/clients');
    const data = await response.json();
    
    console.log('📊 Company Count Analysis:');
    console.log('✅ Success:', data.success);
    console.log('📈 Total Companies:', data.data?.length || 0);
    
    if (data.data && data.data.length > 0) {
      console.log('\n🏢 Companies:');
      data.data.forEach((company, index) => {
        console.log(`${index + 1}. ${company.name} (ID: ${company.id}) - ${company.industry}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

countCompanies();
