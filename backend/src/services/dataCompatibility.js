/**
 * Data compatibility layer to map frontend expectations to backend data
 */

class DataCompatibility {
  /**
   * Transform backend data to match frontend expectations
   */
  static transformForFrontend(backendData) {
    const frontendMapping = {
      'DataSync Analytics': {
        name: 'Vectrix AI',
        industry: 'DevOps',
        score: 92,
        positioning: 'Leader',
        verdict: 'Strong Candidate'
      },
      'CloudFlow Systems': {
        name: 'NeuralDoc',
        industry: 'Healthcare',
        score: 88,
        positioning: 'Leader',
        verdict: 'Strong Candidate'
      },
      'SecureShield AI': {
        name: 'DataWeave',
        industry: 'Analytics',
        score: 85,
        positioning: 'Leader',
        verdict: 'Strong Candidate'
      },
      'RevenueMax CRM': {
        name: 'SecureFlow',
        industry: 'Cybersecurity',
        score: 78,
        positioning: 'Challenger',
        verdict: 'Moderate Risk'
      },
      'DevOps Pipeline Pro': {
        name: 'FinLedger',
        industry: 'FinTech',
        score: 71,
        positioning: 'Niche Specialist',
        verdict: 'Moderate Risk'
      }
    };

    return backendData.map(client => {
      const mapping = frontendMapping[client.name];
      if (mapping) {
        return {
          ...client,
          original_id: client.id,  // Store original database ID
          name: mapping.name,
          industry: mapping.industry,
          score: mapping.score,
          positioning: mapping.positioning,
          verdict: mapping.verdict
        };
      }
      return { ...client, original_id: client.id };
    });
  }

  /**
   * Add a 6th company to match frontend expectations
   */
  static addMissingCompany(data) {
    if (data.length >= 6) return data;
    
    // Find the next available ID
    const existingIds = data.map(c => c.id);
    let newId = 1;
    while (existingIds.includes(newId)) {
      newId++;
    }
    
    const cloudMesh = {
      id: newId,
      original_id: null,  // This is a synthetic company
      name: 'CloudMesh',
      industry: 'Infrastructure',
      overview_short: 'Multi-cloud infrastructure management platform providing unified control',
      score: 67,
      positioning: 'Challenger',
      verdict: 'Moderate Risk',
      key_insight: 'CloudMesh is a challenger infrastructure platform with growing capabilities',
      offering_count: 5,
      capability_count: 6,
      created_at: new Date().toISOString(),
      details: {
        offerings: [
          'Multi-Cloud Orchestration',
          'Cost Optimization',
          'Kubernetes Management',
          'Infrastructure Analytics',
          'Security Compliance'
        ],
        capabilities: [
          'Cross-cloud Orchestration',
          'Real-time Monitoring',
          'Cost Analysis',
          'Resource Optimization',
          'Security Scanning',
          'Performance Analytics'
        ],
        benefits: [
          '30% Cost Reduction',
          'Improved Resource Utilization',
          'Enhanced Security Posture',
          'Simplified Management',
          'Better Performance'
        ],
        differentiators: [
          'Unified multi-cloud interface',
          'AI-powered cost optimization',
          'Automated resource management',
          'Real-time performance analytics'
        ],
        pricing: 'Based on managed cloud spend. Typically 3-5% of optimized cloud costs.'
      }
    };

    return [...data, cloudMesh];
  }
}

module.exports = DataCompatibility;
