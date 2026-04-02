/**
 * Test client 1 specifically
 */

async function testClient1() {
  try {
    console.log('🔍 Testing Client 1...');
    
    // First get all clients to see the IDs
    const allResponse = await fetch('http://localhost:3000/api/clients');
    const allData = await allResponse.json();
    
    console.log('All clients:');
    allData.data.forEach(client => {
      console.log(`ID: ${client.id}, Name: ${client.name}, Original ID: ${client.original_id}`);
    });
    
    // Now try to get client 1
    console.log('\n🎯 Testing client 1...');
    const response = await fetch('http://localhost:3000/api/clients/1');
    const data = await response.json();
    
    console.log('Response:', data);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testClient1();
