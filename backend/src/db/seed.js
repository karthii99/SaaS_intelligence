require('dotenv').config();
const pool = require('./connection');
const fs = require('fs').promises;
const path = require('path');

async function setupDatabase() {
  try {
    console.log('🔧 Setting up database schema...');
    
    // Read and execute schema
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = await fs.readFile(schemaPath, 'utf8');
    
    await pool.query(schema);
    console.log('✅ Database schema created successfully');
    
  } catch (error) {
    console.error('❌ Schema setup failed:', error.message);
    throw error;
  }
}

async function seedData() {
  try {
    console.log('🌱 Starting data seeding...');
    
    // Import client service to use seeder
    const ClientService = require('../services/clientService');
    
    // Realistic SaaS companies data
    const clientsData = [
      {
        name: 'DataSync Analytics',
        industry: 'Data Analytics',
        overview: 'Enterprise-grade data analytics platform specializing in real-time business intelligence and predictive analytics for Fortune 500 companies.',
        details: {
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
        }
      },
      {
        name: 'CloudFlow Systems',
        industry: 'Cloud Infrastructure',
        overview: 'Multi-cloud management platform providing unified infrastructure orchestration and cost optimization for modern enterprises.',
        details: {
          offerings: [
            'Multi-cloud Management',
            'Cost Optimization Engine',
            'Infrastructure Automation',
            'Security Compliance Suite',
            'Performance Monitoring'
          ],
          capabilities: [
            'Cross-cloud Orchestration',
            'Automated Cost Controls',
            'Security Scanning',
            'Resource Optimization',
            'Compliance Reporting',
            'DevOps Integration'
          ],
          benefits: [
            '30% Cost Reduction',
            'Improved Security Posture',
            'Faster Deployment Cycles',
            'Better Resource Utilization',
            'Simplified Compliance'
          ],
          differentiators: [
            'AI-powered cost optimization',
            'Real-time multi-cloud sync',
            'Automated remediation',
            'Unified billing interface'
          ],
          pricing: 'Professional: $2,499/month, Business: $7,999/month, Enterprise: Custom pricing with volume discounts'
        }
      },
      {
        name: 'SecureShield AI',
        industry: 'Cybersecurity',
        overview: 'AI-powered cybersecurity platform providing advanced threat detection and automated response for enterprise security teams.',
        details: {
          offerings: [
            'Threat Detection System',
            'Automated Response Engine',
            'Vulnerability Management',
            'Security Analytics',
            'Compliance Automation'
          ],
          capabilities: [
            'AI/ML Threat Analysis',
            'Real-time Monitoring',
            'Automated Incident Response',
            'Risk Assessment',
            'Threat Intelligence Integration',
            'Security Orchestration'
          ],
          benefits: [
            '95% Threat Detection Rate',
            'Reduced Response Time',
            'Lower Security Costs',
            'Improved Compliance',
            'Enhanced Threat Visibility'
          ],
          differentiators: [
            'Proprietary AI detection models',
            'Sub-minute threat response',
            'Predictive threat analysis',
            'Automated compliance mapping'
          ],
          pricing: 'Essential: $1,999/month, Advanced: $5,999/month, Enterprise: Custom pricing with dedicated support'
        }
      },
      {
        name: 'RevenueMax CRM',
        industry: 'Customer Relationship Management',
        overview: 'Next-generation CRM platform with AI-driven sales automation and customer intelligence for high-growth companies.',
        details: {
          offerings: [
            'Sales Pipeline Management',
            'Customer Intelligence Platform',
            'AI Sales Assistant',
            'Marketing Automation',
            'Analytics Dashboard'
          ],
          capabilities: [
            'AI-powered Lead Scoring',
            'Predictive Sales Analytics',
            'Customer Journey Mapping',
            'Automated Workflows',
            'Multi-channel Integration',
            'Advanced Reporting'
          ],
          benefits: [
            '40% Increase in Sales',
            'Improved Customer Retention',
            'Better Sales Forecasting',
            'Enhanced Team Productivity',
            'Data-driven Decisions'
          ],
          differentiators: [
            'AI sales recommendations',
            'Predictive customer insights',
            'Automated pipeline optimization',
            'Real-time coaching'
          ],
          pricing: 'Starter: $499/month, Growth: $1,999/month, Scale: $4,999/month, Enterprise: Custom pricing'
        }
      },
      {
        name: 'DevOps Pipeline Pro',
        industry: 'DevOps Tools',
        overview: 'Comprehensive DevOps automation platform streamlining CI/CD pipelines and infrastructure management for development teams.',
        details: {
          offerings: [
            'CI/CD Pipeline Builder',
            'Infrastructure as Code',
            'Container Orchestration',
            'Monitoring & Logging',
            'Security Scanning'
          ],
          capabilities: [
            'Automated Testing',
            'Multi-cloud Deployment',
            'Container Management',
            'Real-time Monitoring',
            'Security Integration',
            'Collaboration Tools'
          ],
          benefits: [
            '10x Faster Deployments',
            'Reduced Downtime',
            'Improved Code Quality',
            'Better Team Collaboration',
            'Enhanced Security'
          ],
          differentiators: [
            'Visual pipeline builder',
            'One-click deployments',
            'Automated rollback',
            'Integrated security testing'
          ],
          pricing: 'Team: $299/month, Business: $1,499/month, Enterprise: Custom pricing with premium support'
        }
      }
    ];
    
    // Seed the data
    const response = await ClientService.seedClients(clientsData);
    
    console.log(`✅ Seeding completed: ${response.inserted} inserted, ${response.skipped} skipped`);
    console.log(`📊 ${response.message}`);
    
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    throw error;
  }
}

async function main() {
  try {
    await setupDatabase();
    await seedData();
    console.log('🎉 Database setup and seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('💥 Setup failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { setupDatabase, seedData };
