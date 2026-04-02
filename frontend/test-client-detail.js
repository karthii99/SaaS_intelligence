/**
 * Test ClientDetail page data transformation
 */

async function testClientDetail() {
  try {
    console.log('🔍 Testing ClientDetail Data Flow...');
    
    // Test the API response
    const response = await fetch('http://localhost:3000/api/clients/6');
    const apiData = await response.json();
    
    console.log('✅ API Response Structure:');
    console.log('Success:', apiData.success);
    
    if (apiData.data) {
      const api = apiData.data;
      
      console.log('\n🏢 Client Data:');
      console.log('- Name:', api.client?.name);
      console.log('- Industry:', api.client?.industry);
      console.log('- Overview Length:', api.client?.overview?.length || 0);
      
      console.log('\n🧠 Intelligence Data:');
      console.log('- Overall Score:', api.intelligence?.overall_score);
      console.log('- Strengths Count:', api.intelligence?.strengths?.length || 0);
      console.log('- Risks Count:', api.intelligence?.risks?.length || 0);
      console.log('- Opportunities Count:', api.intelligence?.opportunities?.length || 0);
      console.log('- Weaknesses Count:', api.intelligence?.weaknesses?.length || 0);
      
      console.log('\n💰 Score Breakdown:');
      console.log('- Differentiator Score:', api.intelligence?.differentiator_score);
      console.log('- Market Score:', api.intelligence?.market_score);
      console.log('- Product Score:', api.intelligence?.product_score);
      console.log('- Pricing Score:', api.intelligence?.pricing_score);
      console.log('- Moat Score:', api.intelligence?.moat_score);
      
      console.log('\n📋 Details Data:');
      console.log('- Offerings Count:', api.details?.offerings?.length || 0);
      console.log('- Capabilities Count:', api.details?.capabilities?.length || 0);
      console.log('- Benefits Count:', api.details?.benefits?.length || 0);
      console.log('- Differentiators Count:', api.details?.differentiators?.length || 0);
      console.log('- Pricing:', api.details?.pricing?.substring(0, 50) + '...');
      
      // Simulate frontend transformation
      console.log('\n🔄 Frontend Transformation:');
      const transformed = {
        id: api.client.id,
        name: api.client.name,
        industry: api.client.industry,
        overview: api.client.overview,
        score: api.intelligence.overall_score,
        positioning: api.intelligence.positioning,
        verdict: api.intelligence.verdict,
        insight: api.intelligence.key_takeaway,
        bestFit: api.intelligence.best_fit || "General SaaS market",
        decisionSignal: api.intelligence.verdict,
        strengths: api.intelligence.strengths || [],
        risks: api.intelligence.risks || [],
        opportunities: api.intelligence.opportunities || [],
        weaknesses: api.intelligence.weaknesses || [],
        scores: {
          differentiation: (api.intelligence.differentiator_score || 0) * 10,
          market: (api.intelligence.market_score || 0) * 10,
          product: (api.intelligence.product_score || 0) * 10,
          pricing: (api.intelligence.pricing_score || 0) * 10,
          moat: (api.intelligence.moat_score || 0) * 10,
        },
        details: api.details
      };
      
      console.log('\n✅ Transformed Data:');
      console.log('- Name:', transformed.name);
      console.log('- Score:', transformed.score);
      console.log('- Strengths:', transformed.strengths.length, 'items');
      console.log('- Risks:', transformed.risks.length, 'items');
      console.log('- Score Breakdown:', transformed.scores);
      console.log('- Details Offerings:', transformed.details?.offerings?.length || 0, 'items');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testClientDetail();
