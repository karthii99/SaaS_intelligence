export interface Client {
  id: string;
  name: string;
  industry: string;
  overview: string;
  score: number;
  positioning: "Leader" | "Challenger" | "Niche";
  verdict: "Strong" | "Moderate" | "Weak";
  insight: string;
  bestFit: string;
  decisionSignal: string;
  strengths: string[];
  risks: string[];
  opportunities: string[];
  weaknesses: string[];
  scores: {
    differentiation: number;
    market: number;
    product: number;
    pricing: number;
    moat: number;
  };
  scoreInterpretations: {
    differentiation: string;
    market: string;
    product: string;
    pricing: string;
    moat: string;
  };
  details: {
    overview: string;
    offerings: string[];
    capabilities: string[];
    benefits: string[];
    differentiators: string[];
    pricing: string;
  };
}

export const clients: Client[] = [
  {
    id: "1",
    name: "Vectrix AI",
    industry: "DevOps",
    overview: "AI-powered infrastructure automation platform reducing deployment time by 70%.",
    score: 92,
    positioning: "Leader",
    verdict: "Strong",
    insight: "Strong differentiation in DevOps automation with proprietary ML pipeline.",
    bestFit: "Enterprise DevOps teams managing multi-cloud infrastructure at scale",
    decisionSignal: "High Growth Potential",
    strengths: [
      "Proprietary ML models for deployment optimization",
      "70% reduction in deployment time proven across 200+ enterprises",
      "Strong engineering team with ex-Google/AWS leadership",
      "SOC 2 Type II certified"
    ],
    risks: [
      "Heavy reliance on AWS infrastructure",
      "Limited presence outside North America",
      "Key person risk on CTO"
    ],
    opportunities: [
      "European market expansion potential worth $2.3B",
      "Strategic partnership with major cloud providers",
      "AI-driven security scanning as adjacent product"
    ],
    weaknesses: [
      "High customer acquisition cost",
      "Limited integrations with legacy systems",
      "No mobile management interface"
    ],
    scores: { differentiation: 95, market: 88, product: 92, pricing: 78, moat: 90 },
    scoreInterpretations: {
      differentiation: "Strong competitive moat",
      market: "Well-positioned in growing market",
      product: "Best-in-class product quality",
      pricing: "Needs pricing optimization",
      moat: "High barrier to entry for competitors"
    },
    details: {
      overview: "Vectrix AI is a next-generation DevOps automation platform that leverages machine learning to optimize CI/CD pipelines, infrastructure provisioning, and deployment strategies. Founded in 2020, the company has grown to serve over 200 enterprise customers.",
      offerings: ["CI/CD Pipeline Automation", "Infrastructure as Code", "Deployment Optimization", "Monitoring & Observability"],
      capabilities: ["ML-powered pipeline optimization", "Auto-scaling infrastructure", "Zero-downtime deployments", "Real-time anomaly detection"],
      benefits: ["70% faster deployments", "45% cost reduction", "99.99% uptime SLA", "24/7 expert support"],
      differentiators: ["Proprietary ML models", "No-code pipeline builder", "Multi-cloud native", "Built-in compliance engine"],
      pricing: "Usage-based pricing starting at $2,500/mo for teams. Enterprise plans with custom SLAs available."
    }
  },
  {
    id: "2",
    name: "DataWeave",
    industry: "Analytics",
    overview: "Competitive intelligence platform for e-commerce brands with real-time pricing data.",
    score: 85,
    positioning: "Leader",
    verdict: "Strong",
    insight: "Market leader in e-commerce competitive intelligence with 10K+ data sources.",
    bestFit: "Mid-to-large e-commerce brands needing competitive pricing intelligence",
    decisionSignal: "Market Leader",
    strengths: [
      "10,000+ data sources across global e-commerce",
      "Real-time pricing intelligence engine",
      "Strong partnerships with Shopify and BigCommerce",
      "Proven ROI averaging 340% for customers"
    ],
    risks: [
      "Web scraping legal challenges in EU markets",
      "Data accuracy concerns in emerging markets",
      "Increasing competition from Google Shopping tools"
    ],
    opportunities: [
      "B2B marketplace expansion",
      "Supply chain intelligence add-on",
      "Southeast Asian market entry"
    ],
    weaknesses: [
      "Complex onboarding process (avg 6 weeks)",
      "Limited brand sentiment analysis",
      "UI/UX needs modernization"
    ],
    scores: { differentiation: 82, market: 90, product: 85, pricing: 75, moat: 80 },
    scoreInterpretations: {
      differentiation: "Solid differentiation advantage",
      market: "Dominant market position",
      product: "Strong product-market fit",
      pricing: "Competitive but room to improve",
      moat: "Good defensibility"
    },
    details: {
      overview: "DataWeave provides AI-powered competitive intelligence for e-commerce brands, tracking pricing, assortment, and market trends across thousands of online retailers globally.",
      offerings: ["Competitive Pricing Intelligence", "Assortment Analytics", "Market Trend Analysis", "Brand Protection"],
      capabilities: ["Real-time price tracking", "AI-driven trend forecasting", "Cross-marketplace analysis", "Automated reporting"],
      benefits: ["340% average ROI", "15% margin improvement", "Real-time competitive alerts", "Custom dashboards"],
      differentiators: ["Largest e-commerce data network", "Patented matching algorithms", "Multi-language support", "API-first architecture"],
      pricing: "Tiered pricing from $5,000/mo based on SKU coverage and data sources monitored."
    }
  },
  {
    id: "3",
    name: "SecureFlow",
    industry: "Cybersecurity",
    overview: "Zero-trust security platform for hybrid cloud environments with automated threat response.",
    score: 78,
    positioning: "Challenger",
    verdict: "Moderate",
    insight: "Emerging player in zero-trust with strong product but limited market reach.",
    bestFit: "Mid-market enterprises transitioning to hybrid cloud with strict compliance needs",
    decisionSignal: "Emerging Player",
    strengths: [
      "Advanced zero-trust architecture",
      "Automated threat response under 30 seconds",
      "FedRAMP authorization in progress"
    ],
    risks: [
      "Crowded market with established players",
      "Burn rate concerns — 18 months runway",
      "Limited channel partner network"
    ],
    opportunities: [
      "Government sector via FedRAMP",
      "MSSP partnerships for SMB reach",
      "Acquisition target for larger security vendors"
    ],
    weaknesses: [
      "Small sales team (12 reps)",
      "No endpoint protection offering",
      "Documentation needs improvement"
    ],
    scores: { differentiation: 72, market: 65, product: 88, pricing: 80, moat: 60 },
    scoreInterpretations: {
      differentiation: "Moderate differentiation",
      market: "Needs stronger market presence",
      product: "Excellent product execution",
      pricing: "Well-positioned pricing",
      moat: "Vulnerable to competition"
    },
    details: {
      overview: "SecureFlow delivers zero-trust security for hybrid cloud environments, combining network micro-segmentation with AI-powered threat detection and automated incident response.",
      offerings: ["Zero-Trust Network Access", "Cloud Security Posture Management", "Automated Incident Response", "Compliance Automation"],
      capabilities: ["Micro-segmentation", "AI threat detection", "Automated remediation", "Compliance reporting"],
      benefits: ["30-second threat response", "85% fewer security incidents", "Simplified compliance", "Single pane of glass"],
      differentiators: ["Hybrid-cloud native", "Automated response engine", "Identity-centric security", "Low-code policy builder"],
      pricing: "Per-seat pricing at $15/user/mo. Volume discounts available for 500+ seats."
    }
  },
  {
    id: "4",
    name: "FinLedger",
    industry: "FinTech",
    overview: "Blockchain-based reconciliation platform for institutional finance with 99.99% accuracy.",
    score: 71,
    positioning: "Niche",
    verdict: "Moderate",
    insight: "Niche blockchain reconciliation play with strong accuracy but limited TAM.",
    bestFit: "Institutional banks and asset managers needing immutable reconciliation",
    decisionSignal: "Niche Specialist",
    strengths: [
      "99.99% reconciliation accuracy",
      "Blockchain-based audit trail",
      "Strong compliance framework"
    ],
    risks: [
      "Small addressable market",
      "Regulatory uncertainty around blockchain",
      "Slow enterprise sales cycle (9+ months)"
    ],
    opportunities: [
      "Central bank digital currency infrastructure",
      "Cross-border payment reconciliation",
      "DeFi institutional bridge"
    ],
    weaknesses: [
      "Blockchain skepticism in traditional finance",
      "High implementation costs",
      "Limited technical talent pipeline"
    ],
    scores: { differentiation: 75, market: 55, product: 80, pricing: 65, moat: 70 },
    scoreInterpretations: {
      differentiation: "Unique positioning in niche",
      market: "Limited addressable market",
      product: "Strong product capabilities",
      pricing: "Premium pricing limits adoption",
      moat: "Moderate defensibility"
    },
    details: {
      overview: "FinLedger provides blockchain-powered financial reconciliation for banks and institutional investors, ensuring immutable audit trails and near-perfect accuracy in transaction matching.",
      offerings: ["Transaction Reconciliation", "Audit Trail Management", "Compliance Reporting", "Settlement Automation"],
      capabilities: ["Blockchain ledger", "Smart contract automation", "Real-time reconciliation", "Multi-currency support"],
      benefits: ["99.99% accuracy", "80% faster reconciliation", "Immutable audit trail", "Regulatory compliance"],
      differentiators: ["Blockchain-native architecture", "Institutional-grade security", "Smart contract automation", "Multi-chain support"],
      pricing: "Enterprise licensing starting at $50,000/year. Implementation fees additional."
    }
  },
  {
    id: "5",
    name: "CloudMesh",
    industry: "Infrastructure",
    overview: "Multi-cloud management platform simplifying hybrid infrastructure orchestration.",
    score: 67,
    positioning: "Challenger",
    verdict: "Moderate",
    insight: "Solid multi-cloud play but facing pressure from hyperscaler native tools.",
    bestFit: "Large enterprises managing workloads across 3+ cloud providers",
    decisionSignal: "Watch Closely",
    strengths: [
      "True multi-cloud orchestration",
      "Cost optimization engine saving avg 35%",
      "Strong Kubernetes integration"
    ],
    risks: [
      "Hyperscalers building competing features",
      "Complex product requiring specialized expertise",
      "Customer churn at 15% annually"
    ],
    opportunities: [
      "FinOps market growth",
      "Edge computing orchestration",
      "Managed service offering"
    ],
    weaknesses: [
      "Steep learning curve",
      "Limited SMB traction",
      "Fragmented product roadmap"
    ],
    scores: { differentiation: 60, market: 70, product: 72, pricing: 68, moat: 55 },
    scoreInterpretations: {
      differentiation: "Weak differentiation vs. native tools",
      market: "Growing but competitive market",
      product: "Adequate product quality",
      pricing: "Acceptable pricing model",
      moat: "Low barrier — easily replicated"
    },
    details: {
      overview: "CloudMesh provides unified multi-cloud management, enabling enterprises to orchestrate workloads across AWS, Azure, GCP, and private clouds from a single control plane.",
      offerings: ["Multi-Cloud Orchestration", "Cost Optimization", "Kubernetes Management", "Infrastructure Analytics"],
      capabilities: ["Cross-cloud workload migration", "Automated cost optimization", "Unified monitoring", "Policy enforcement"],
      benefits: ["35% cloud cost reduction", "Single control plane", "Vendor lock-in prevention", "Simplified compliance"],
      differentiators: ["True multi-cloud support", "AI-driven optimization", "No vendor lock-in", "Open-source core"],
      pricing: "Based on managed cloud spend. Typically 3-5% of optimized cloud costs."
    }
  },
  {
    id: "6",
    name: "NeuralDoc",
    industry: "Healthcare",
    overview: "AI-powered clinical documentation platform reducing physician burnout by 40%.",
    score: 88,
    positioning: "Leader",
    verdict: "Strong",
    insight: "High-impact healthcare AI with proven clinical outcomes and FDA pathway.",
    bestFit: "Health systems and large physician groups seeking documentation automation",
    decisionSignal: "High Growth Potential",
    strengths: [
      "40% reduction in documentation time",
      "FDA 510(k) clearance pathway initiated",
      "Integration with top 5 EHR systems",
      "Published clinical validation studies"
    ],
    risks: [
      "FDA regulatory timeline uncertainty",
      "HIPAA compliance complexity",
      "Physician adoption resistance"
    ],
    opportunities: [
      "Expanding to nursing documentation",
      "International market entry (UK NHS)",
      "Clinical decision support add-on"
    ],
    weaknesses: [
      "High per-implementation cost",
      "Limited specialty coverage",
      "Requires significant training data"
    ],
    scores: { differentiation: 90, market: 85, product: 88, pricing: 72, moat: 85 },
    scoreInterpretations: {
      differentiation: "Highly differentiated AI approach",
      market: "Strong market demand trajectory",
      product: "Clinically validated product",
      pricing: "Premium pricing for value delivered",
      moat: "Strong IP and regulatory moat"
    },
    details: {
      overview: "NeuralDoc uses ambient AI to automatically generate clinical documentation from patient-physician conversations, dramatically reducing administrative burden while improving note quality.",
      offerings: ["Ambient Clinical Documentation", "Clinical Note Generation", "EHR Integration", "Quality Analytics"],
      capabilities: ["Ambient listening AI", "Medical NLP", "Auto-coding (ICD-10/CPT)", "Quality metrics tracking"],
      benefits: ["40% less documentation time", "Improved note quality", "Reduced physician burnout", "Better patient engagement"],
      differentiators: ["Ambient AI technology", "Clinical validation", "EHR-agnostic", "Specialty-specific models"],
      pricing: "Per-provider licensing at $800/provider/mo. Health system pricing available."
    }
  },
];
