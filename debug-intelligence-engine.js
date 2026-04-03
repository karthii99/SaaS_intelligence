const IntelligenceEngine = require('./backend/src/intelligence/engine');

// Simulate real client data (like what comes from database)
const realClientData = {
  id: 6,
  name: 'Vectrix AI',
  industry: 'DevOps',
  overview: 'Enterprise-grade data analytics platform specializing in real-time business intelligence and predictive analytics for Fortune 500 companies.',
  created_at: new Date().toISOString()
};

const realDetails = {
  offerings: [
    'Real-time Dashboard Analytics',
    'Predictive Intelligence Suite',
    'Data Visualization Platform',
    'Enterprise Reporting Tools',
    'Custom Analytics Solutions'
  ],
  capabilities: [
    'Machine Learning Integration',
    'Real-time Data Processing',
    'Advanced Visualization',
    'API-first Architecture',
    'Enterprise Security',
    'Scalable Cloud Infrastructure'
  ],
  benefits: [
    'Improved Decision Making',
    'Real-time Business Insights',
    'Reduced Analysis Time',
    'Enhanced Data Accuracy',
    'Competitive Intelligence'
  ],
  differentiators: [
    'Proprietary ML algorithms',
    'Sub-second data processing',
    'Industry-specific templates',
    'No-code analytics builder'
  ],
  pricing: 'Startup: $999/month, Business: $4,999/month, Enterprise: Custom pricing starting at $25,000/month'
};

console.log('🔍 Testing Intelligence Engine with Real Client Data...');
console.log('📊 Client:', realClientData.name);
console.log('📋 Offerings:', realDetails.offerings.length);
console.log('🔧 Capabilities:', realDetails.capabilities.length);
console.log('🎯 Differentiators:', realDetails.differentiators.length);

try {
  const intelligence = IntelligenceEngine.generateIntelligence(realClientData, realDetails);
  
  console.log('\n✅ Generated Intelligence:');
  console.log('- Overall Score:', intelligence.overall_score);
  console.log('- Differentiator Score:', intelligence.differentiator_score);
  console.log('- Market Score:', intelligence.market_score);
  console.log('- Product Score:', intelligence.product_score);
  console.log('- Pricing Score:', intelligence.pricing_score);
  console.log('- Moat Score:', intelligence.moat_score);
  console.log('- Strengths:', intelligence.strengths?.length || 0, 'items');
  console.log('- Weaknesses:', intelligence.weaknesses?.length || 0, 'items');
  console.log('- Risks:', intelligence.risks?.length || 0, 'items');
  console.log('- Opportunities:', intelligence.opportunities?.length || 0, 'items');
  
  console.log('\n📝 Sample Weaknesses:', intelligence.weaknesses);
  
} catch (error) {
  console.error('❌ Error:', error.message);
  console.error('Stack:', error.stack);
}
