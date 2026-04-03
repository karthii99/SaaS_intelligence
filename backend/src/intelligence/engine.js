/**
 * SaaS Intelligence Engine
 * Core decision-support system that transforms raw data into structured intelligence
 */

class IntelligenceEngine {
  /**
   * Generate comprehensive intelligence for a client
   */
  static generateIntelligence(client, details) {
    const intelligence = {
      summary: this.generateSummary(client, details),
      positioning: this.determinePositioning(details),
      strengths: this.identifyStrengths(details),
      weaknesses: this.identifyWeaknesses(details),
      risks: this.identifyRisks(details),
      opportunities: this.identifyOpportunities(details),
      differentiator_score: this.calculateDifferentiatorScore(details),
      market_score: this.calculateMarketScore(details),
      product_score: this.calculateProductScore(details),
      pricing_score: this.calculatePricingScore(details),
      moat_score: this.calculateMoatScore(details),
      overall_score: 0,
      verdict: '',
      best_fit: this.determineBestFit(details),
      key_takeaway: this.generateKeyTakeaway(client, details)
    };

    // Calculate overall weighted score
    intelligence.overall_score = this.calculateOverallScore(intelligence);
    
    // Determine verdict based on overall score
    intelligence.verdict = this.determineVerdict(intelligence.overall_score);

    return intelligence;
  }

  /**
   * Generate executive summary
   */
  static generateSummary(client, details) {
    const offeringCount = details.offerings?.length || 0;
    const capabilityCount = details.capabilities?.length || 0;
    const differentiatorCount = details.differentiators?.length || 0;

    return `${client.name} is a ${client.industry.toLowerCase()} company offering ${offeringCount} core solutions with ${capabilityCount} key capabilities. Their competitive advantage stems from ${differentiatorCount} unique differentiators, positioning them as a specialized player in the market.`;
  }

  /**
   * Determine market positioning
   */
  static determinePositioning(details) {
    const offeringCount = details.offerings?.length || 0;
    const differentiatorCount = details.differentiators?.length || 0;
    const capabilityCount = details.capabilities?.length || 0;

    if (offeringCount >= 4 && differentiatorCount >= 3 && capabilityCount >= 4) {
      return 'Leader';
    } else if (offeringCount >= 2 && differentiatorCount >= 2) {
      return 'Challenger';
    } else {
      return 'Niche';
    }
  }

  /**
   * Identify strengths based on data
   */
  static identifyStrengths(details) {
    const strengths = [];
    
    if (details.offerings?.length >= 3) {
      strengths.push('Diverse product portfolio with multiple revenue streams');
    }
    
    if (details.capabilities?.length >= 4) {
      strengths.push('Strong technical and operational capabilities');
    }
    
    if (details.differentiators?.length >= 3) {
      strengths.push('Clear competitive advantages and unique value propositions');
    }
    
    if (details.pricing && details.pricing.toLowerCase().includes('tier')) {
      strengths.push('Flexible pricing strategy catering to different segments');
    }

    return strengths;
  }

  /**
   * Identify weaknesses based on data
   */
  static identifyWeaknesses(details) {
    const weaknesses = [];
    
    if (details.offerings?.length < 2) {
      weaknesses.push('Limited product diversification increases dependency risk');
    }
    
    if (details.capabilities?.length < 3) {
      weaknesses.push('Narrow capability set may limit market expansion');
    }
    
    if (!details.differentiators || details.differentiators.length < 2) {
      weaknesses.push('Weak differentiation in competitive market');
    }
    
    if (!details.pricing || details.pricing.length < 50) {
      weaknesses.push('Unclear or incomplete pricing strategy');
    }

    // Add weaknesses for strong companies to keep it realistic
    if (details.offerings?.length >= 5 && details.capabilities?.length >= 5) {
      weaknesses.push('Complex product portfolio may dilute focus');
      weaknesses.push('High operational complexity could impact agility');
    }
    
    if (details.differentiators?.length >= 4) {
      weaknesses.push('Market saturation risk in core segments');
    }

    // Ensure at least one weakness for realistic analysis
    if (weaknesses.length === 0) {
      weaknesses.push('Limited brand recognition in emerging markets');
      weaknesses.push('Dependency on key customer segments');
    }

    return weaknesses.slice(0, 3); // Limit to 3 weaknesses
  }

  /**
   * Identify potential risks
   */
  static identifyRisks(details) {
    const risks = [];
    
    if (details.offerings?.length > 5) {
      risks.push('Product complexity may impact operational efficiency');
    }
    
    if (details.differentiators?.length === 0) {
      risks.push('High vulnerability to competitive pressure');
    }
    
    if (!details.pricing || !details.pricing.includes('$')) {
      risks.push('Pricing ambiguity may affect customer acquisition');
    }

    risks.push('Market saturation in core segments');
    risks.push('Technology disruption risk');

    return risks;
  }

  /**
   * Identify opportunities
   */
  static identifyOpportunities(details) {
    const opportunities = [];
    
    if (details.capabilities?.some(cap => cap.toLowerCase().includes('ai') || cap.toLowerCase().includes('machine learning'))) {
      opportunities.push('AI/ML market expansion and premium positioning');
    }
    
    if (details.offerings?.some(off => off.toLowerCase().includes('enterprise'))) {
      opportunities.push('Enterprise market penetration and upselling');
    }
    
    if (details.differentiators?.length >= 2) {
      opportunities.push('Strategic partnerships and channel expansion');
    }

    opportunities.push('International market expansion');
    opportunities.push('Adjacent service line development');

    return opportunities;
  }

  /**
   * Calculate differentiator score (0-10)
   */
  static calculateDifferentiatorScore(details) {
    const count = details.differentiators?.length || 0;
    if (count >= 4) return 9;
    if (count >= 3) return 8;
    if (count >= 2) return 6;
    if (count >= 1) return 4;
    return 2;
  }

  /**
   * Calculate market score (0-10)
   */
  static calculateMarketScore(details) {
    const offeringCount = details.offerings?.length || 0;
    const benefitCount = details.benefits?.length || 0;
    
    const baseScore = Math.min((offeringCount * 2) + (benefitCount * 1.5), 10);
    return Math.round(baseScore * 10) / 10;
  }

  /**
   * Calculate product score (0-10)
   */
  static calculateProductScore(details) {
    const capabilityCount = details.capabilities?.length || 0;
    const offeringCount = details.offerings?.length || 0;
    
    const baseScore = Math.min((capabilityCount * 2) + (offeringCount * 1), 10);
    return Math.round(baseScore * 10) / 10;
  }

  /**
   * Calculate pricing score (0-10)
   */
  static calculatePricingScore(details) {
    if (!details.pricing) return 3;
    
    let score = 5; // Base score
    
    if (details.pricing.toLowerCase().includes('tier')) score += 2;
    if (details.pricing.toLowerCase().includes('enterprise')) score += 1;
    if (details.pricing.toLowerCase().includes('startup')) score += 1;
    if (details.pricing.includes('$')) score += 1;
    
    return Math.min(score, 10);
  }

  /**
   * Calculate moat score (0-10)
   */
  static calculateMoatScore(details) {
    const differentiatorCount = details.differentiators?.length || 0;
    const capabilityCount = details.capabilities?.length || 0;
    
    // Moat is based on unique differentiators and specialized capabilities
    const moatScore = Math.min((differentiatorCount * 3) + (capabilityCount * 1), 10);
    return Math.round(moatScore * 10) / 10;
  }

  /**
   * Calculate overall weighted score
   */
  static calculateOverallScore(intelligence) {
    const weights = {
      differentiator_score: 0.25,
      product_score: 0.25,
      market_score: 0.20,
      pricing_score: 0.15,
      moat_score: 0.15
    };

    const overall = 
      intelligence.differentiator_score * weights.differentiator_score +
      intelligence.product_score * weights.product_score +
      intelligence.market_score * weights.market_score +
      intelligence.pricing_score * weights.pricing_score +
      intelligence.moat_score * weights.moat_score;

    return Math.round(overall * 10) / 10;
  }

  /**
   * Determine verdict based on score
   */
  static determineVerdict(score) {
    if (score >= 8) return 'Strong';
    if (score >= 6) return 'Moderate';
    return 'Weak';
  }

  /**
   * Determine best fit scenarios
   */
  static determineBestFit(details) {
    const fits = [];
    
    if (details.offerings?.some(off => off.toLowerCase().includes('enterprise'))) {
      fits.push('Enterprise clients seeking comprehensive solutions');
    }
    
    if (details.capabilities?.some(cap => cap.toLowerCase().includes('api'))) {
      fits.push('API-first organizations and integration requirements');
    }
    
    if (details.pricing?.toLowerCase().includes('startup')) {
      fits.push('Startups and SMBs with budget constraints');
    }

    if (fits.length === 0) {
      fits.push('Mid-market companies requiring balanced solutions');
    }

    return fits;
  }

  /**
   * Generate key insight (one-liner)
   */
  static generateKeyTakeaway(client, details) {
    const offeringCount = details.offerings?.length || 0;
    const differentiatorCount = details.differentiators?.length || 0;
    const hasClearPricing = details.pricing && details.pricing.length > 50;

    let insight = `${client.name} is a `;
    
    if (differentiatorCount >= 3) {
      insight += 'strongly differentiated ';
    } else if (differentiatorCount >= 1) {
      insight += 'moderately differentiated ';
    } else {
      insight += 'emerging ';
    }

    insight += `${client.industry.toLowerCase()} platform with `;
    
    if (offeringCount >= 4) {
      insight += 'extensive offerings';
    } else if (offeringCount >= 2) {
      insight += 'diversified solutions';
    } else {
      insight += 'focused solutions';
    }

    if (hasClearPricing) {
      insight += ' and clear pricing strategy.';
    } else {
      insight += ' but needs pricing clarity.';
    }

    return insight;
  }
}

module.exports = IntelligenceEngine;
