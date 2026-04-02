require('dotenv').config();
const pool = require('./connection');
const ClientService = require('../services/clientService');

async function seedFrontendData() {
  try {
    console.log('🌱 Seeding frontend-compatible data...');
    
    const frontendData = [
      {
        name: 'Vectrix AI',
        industry: 'DevOps',
        overview: 'AI-powered DevOps automation platform that streamlines deployment workflows and optimizes infrastructure management for modern development teams.',
        details: {
          offerings: [
            'Automated CI/CD Pipelines',
            'Infrastructure as Code',
            'AI Deployment Optimization',
            'Performance Monitoring',
            'Security Scanning',
            'Multi-cloud Management'
          ],
          capabilities: [
            'Machine Learning Integration',
            'Real-time Analytics',
            'Predictive Scaling',
            'Automated Testing',
            'Container Orchestration',
            'DevOps Workflow Automation'
          ],
          benefits: [
            '50% Faster Deployments',
            'Reduced Infrastructure Costs',
            'Improved System Reliability',
            'Enhanced Security Posture',
            'Better Team Collaboration'
          ],
          differentiators: [
            'AI-driven deployment optimization',
            'Predictive infrastructure scaling',
            'Automated root cause analysis',
            'Zero-downtime deployments'
          ],
          pricing: 'Starter: $299/month, Professional: $999/month, Enterprise: Custom pricing'
        }
      },
      {
        name: 'NeuralDoc',
        industry: 'Healthcare',
        overview: 'AI-powered medical documentation platform that automates clinical note-taking and improves patient care through intelligent data analysis.',
        details: {
          offerings: [
            'AI Clinical Documentation',
            'Patient Data Analysis',
            'Medical Coding Automation',
            'Clinical Decision Support',
            'Patient Engagement Tools',
            'Telemedicine Integration'
          ],
          capabilities: [
            'Natural Language Processing',
            'Medical AI Algorithms',
            'HIPAA Compliance',
            'Real-time Data Processing',
            'Voice Recognition',
            'Clinical Workflow Integration'
          ],
          benefits: [
            '40% Time Savings on Documentation',
            'Improved Clinical Accuracy',
            'Better Patient Outcomes',
            'Reduced Administrative Burden',
            'Enhanced Revenue Cycle'
          ],
          differentiators: [
            'Proprietary medical NLP',
            'Real-time clinical insights',
            'Automated medical coding',
            'Voice-powered documentation'
          ],
          pricing: 'Small Practice: $499/month, Medium: $1,499/month, Large: Custom pricing'
        }
      },
      {
        name: 'DataWeave',
        industry: 'Analytics',
        overview: 'Advanced analytics platform that transforms raw data into actionable business intelligence through machine learning and predictive modeling.',
        details: {
          offerings: [
            'Business Intelligence Dashboard',
            'Predictive Analytics Engine',
            'Data Visualization Tools',
            'Real-time Analytics',
            'Custom Reporting',
            'Data Integration Platform'
          ],
          capabilities: [
            'Machine Learning Models',
            'Big Data Processing',
            'Real-time Data Streaming',
            'Advanced Visualizations',
            'Predictive Analytics',
            'Data Warehousing'
          ],
          benefits: [
            'Data-driven Decision Making',
            'Improved Business Insights',
            'Competitive Advantage',
            'Operational Efficiency',
            'Risk Reduction'
          ],
          differentiators: [
            'Proprietary ML algorithms',
            'Real-time data processing',
            'Industry-specific models',
            'No-code analytics builder'
          ],
          pricing: 'Basic: $799/month, Professional: $2,499/month, Enterprise: Custom pricing'
        }
      },
      {
        name: 'SecureFlow',
        industry: 'Cybersecurity',
        overview: 'Next-generation cybersecurity platform that provides advanced threat protection and automated incident response for enterprise security.',
        details: {
          offerings: [
            'Threat Detection System',
            'Automated Response Engine',
            'Vulnerability Management',
            'Security Analytics',
            'Compliance Management',
            'Security Training Platform'
          ],
          capabilities: [
            'AI Threat Analysis',
            'Real-time Monitoring',
            'Automated Incident Response',
            'Risk Assessment',
            'Security Orchestration',
            'Compliance Reporting'
          ],
          benefits: [
            '95% Threat Detection Rate',
            'Reduced Response Time',
            'Lower Security Costs',
            'Improved Compliance',
            'Enhanced Threat Visibility'
          ],
          differentiators: [
            'AI-powered threat detection',
            'Automated response workflows',
            'Predictive threat analysis',
            'Integrated compliance management'
          ],
          pricing: 'Essential: $1,999/month, Advanced: $4,999/month, Enterprise: Custom pricing'
        }
      },
      {
        name: 'FinLedger',
        industry: 'FinTech',
        overview: 'Comprehensive financial management platform that automates accounting processes and provides real-time financial insights for businesses.',
        details: {
          offerings: [
            'Automated Accounting',
            'Financial Analytics',
            'Invoice Management',
            'Expense Tracking',
            'Tax Compliance',
            'Financial Reporting'
          ],
          capabilities: [
            'Real-time Financial Data',
            'Automated Bookkeeping',
            'Tax Calculation Engine',
            'Financial Forecasting',
            'Multi-currency Support',
            'Integration APIs'
          ],
          benefits: [
            '80% Time Savings on Accounting',
            'Improved Financial Accuracy',
            'Better Cash Flow Management',
            'Tax Compliance Assurance',
            'Data-driven Financial Insights'
          ],
          differentiators: [
            'AI-powered categorization',
            'Real-time financial insights',
            'Automated tax optimization',
            'Seamless bank integrations'
          ],
          pricing: 'Startup: $199/month, Business: $599/month, Enterprise: Custom pricing'
        }
      },
      {
        name: 'CloudMesh',
        industry: 'Infrastructure',
        overview: 'Multi-cloud infrastructure management platform that provides unified control and optimization across different cloud providers.',
        details: {
          offerings: [
            'Multi-cloud Management',
            'Infrastructure Monitoring',
            'Cost Optimization',
            'Resource Orchestration',
            'Security Compliance',
            'Performance Analytics'
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
          pricing: 'Professional: $1,999/month, Business: $4,999/month, Enterprise: Custom pricing'
        }
      }
    ];

    const result = await ClientService.seedClients(frontendData);
    
    console.log(`✅ Frontend-compatible data seeded: ${result.inserted} inserted, ${result.skipped} skipped`);
    console.log(`📊 ${result.message}`);
    
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    throw error;
  }
}

if (require.main === module) {
  seedFrontendData().catch(console.error);
}

module.exports = seedFrontendData;
