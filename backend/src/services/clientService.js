const pool = require('../db/connection');
const IntelligenceEngine = require('../intelligence/engine');
const DataCompatibility = require('./dataCompatibility');

class ClientService {

  /**
   * 🔥 STANDARDIZE INTELLIGENCE STRUCTURE
   */
  static createStandardIntelligence(raw, details) {
    const baseScore = raw?.overall_score
      ? Math.round(raw.overall_score * 10) // Convert 0–10 → 0–100
      : 80;

    // 🔥 FIXED SCORE BREAKDOWN (NEVER ZERO)
    const scores = {
      differentiation: raw?.differentiator_score 
        ? Math.round(raw.differentiator_score * 10)
        : Math.min(baseScore, 95),

      market: raw?.market_score 
        ? Math.round(raw.market_score * 10)
        : Math.max(baseScore - 5, 60),

      product: raw?.product_score 
        ? Math.round(raw.product_score * 10)
        : baseScore,

      pricing: raw?.pricing_score 
        ? Math.round(raw.pricing_score * 10)
        : Math.max(baseScore - 10, 50),

      moat: raw?.moat_score 
        ? Math.round(raw.moat_score * 10)
        : Math.max(baseScore - 7, 55)
    };

    // 🔥 FIXED EMPTY ARRAYS (ALWAYS HAVE VALUES)
    const strengths = raw?.strengths?.length > 0 
      ? raw.strengths 
      : details?.capabilities?.slice(0, 3) || ["Strong technical foundation", "Market presence"];

    const weaknesses = raw?.weaknesses?.length > 0 
      ? raw.weaknesses 
      : details?.differentiators?.slice(0, 2) || ["Limited brand recognition", "Smaller market share"];

    const risks = raw?.risks?.length > 0 
      ? raw.risks 
      : ["Market competition", "Execution risk"];

    const opportunities = raw?.opportunities?.length > 0 
      ? raw.opportunities 
      : ["Market expansion", "Product innovation"];

    return {
      overall_score: baseScore,
      positioning: raw?.positioning || "Challenger",
      verdict: raw?.verdict || (
        baseScore >= 85 ? "Strong Candidate" : 
        baseScore >= 70 ? "Moderate Risk" : "Weak"
      ),
      key_takeaway: raw?.key_takeaway || "Requires further analysis",
      
      strengths,
      weaknesses,
      risks,
      opportunities,
      
      scores
    };
  }

  /**
   * GET ALL CLIENTS
   */
  static async getAllClients(search = '', industry = '') {
    try {
      let query = `
        SELECT 
          c.id,
          c.name,
          c.industry,
          c.overview,
          c.created_at,
          cd.offerings,
          cd.capabilities,
          cd.benefits,
          cd.differentiators,
          cd.pricing
        FROM clients c
        LEFT JOIN client_details cd ON c.id = cd.client_id
      `;

      const params = [];
      const conditions = [];

      if (search) {
        conditions.push(`LOWER(c.name) LIKE LOWER($${params.length + 1})`);
        params.push(`%${search}%`);
      }

      if (industry) {
        conditions.push(`LOWER(c.industry) = LOWER($${params.length + 1})`);
        params.push(industry);
      }

      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }

      query += ' ORDER BY c.created_at DESC';

      const result = await pool.query(query, params);

      let transformedData = result.rows.map(row => {
        const clientData = {
          id: row.id,
          name: row.name,
          industry: row.industry,
          overview: row.overview,
          created_at: row.created_at
        };

        const details = {
          offerings: row.offerings || [],
          capabilities: row.capabilities || [],
          benefits: row.benefits || [],
          differentiators: row.differentiators || [],
          pricing: row.pricing
        };

        // Generate intelligence using IntelligenceEngine
        const rawIntelligence = IntelligenceEngine.generateIntelligence(clientData, details);
        
        // Standardize the intelligence structure
        const intelligence = this.createStandardIntelligence(rawIntelligence, details);

        return {
          id: row.id,
          name: row.name,
          industry: row.industry,
          overview_short: row.overview, // Use overview as overview_short

          // 🔥 USE STANDARDIZED VALUES
          score: intelligence.overall_score,
          positioning: intelligence.positioning,
          verdict: intelligence.verdict,
          key_insight: intelligence.key_takeaway,

          offering_count: details.offerings.length,
          capability_count: details.capabilities.length,

          created_at: row.created_at,
          original_id: row.id,

          details
        };
      });

      transformedData = DataCompatibility.transformForFrontend(transformedData);
      transformedData = DataCompatibility.addMissingCompany(transformedData);

      return transformedData;

    } catch (error) {
      throw new Error(`Failed to fetch clients: ${error.message}`);
    }
  }

  /**
   * 🔥 GET CLIENT BY ID (USE CACHED VALUES)
   */
  static async getClientById(id) {
    try {
      // Get all clients to ensure consistency
      const allClients = await this.getAllClients();
      const client = allClients.find(c => c.id == id);

      if (!client) throw new Error('Client not found');

      // 🔥 USE CACHED VALUES - NO RECOMPUTATION
      const score = Number(client.score) || 80;
      const positioning = client.positioning || "Challenger";
      const verdict = client.verdict || "Moderate Risk";
      const keyInsight = client.key_insight || "Requires further analysis";

      // 🔥 CONSISTENT SCORE BREAKDOWN
      const scores = {
        differentiation: Math.min(score, 95),
        market: Math.max(score - 5, 60),
        product: score,
        pricing: Math.max(score - 10, 50),
        moat: Math.max(score - 7, 55)
      };

      // 🔥 CONSISTENT ARRAY DATA
      const details = client.details || {};
      const strengths = details.capabilities?.slice(0, 3) || ["Strong technical foundation", "Market presence"];
      const weaknesses = details.differentiators?.slice(0, 2) || ["Limited brand recognition", "Smaller market share"];
      const risks = ["Market competition", "Execution risk"];
      const opportunities = ["Market expansion", "Product innovation"];

      // 🔥 CloudMesh case (synthetic client)
      if (client.original_id === null) {
        return {
          client: {
            id: client.id,
            name: client.name,
            industry: client.industry,
            overview: client.overview_short,
            created_at: client.created_at
          },
          details: client.details,
          intelligence: {
            overall_score: score,
            positioning: positioning,
            verdict: verdict,
            key_takeaway: keyInsight,
            
            strengths: ["Strong market positioning", "Growing customer base", "Competitive pricing"],
            weaknesses: ["Limited brand recognition", "Smaller market share"],
            risks: ["Market competition", "Technology complexity"],
            opportunities: ["Market expansion", "Feature enhancement", "Partnership opportunities"],
            
            scores
          }
        };
      }

      // 🔥 NORMAL CASE (USE CACHED VALUES)
      return {
        client: {
          id: client.id,
          name: client.name,
          industry: client.industry,
          overview: client.overview_short,
          created_at: client.created_at
        },
        details: client.details,
        intelligence: {
          overall_score: score,
          positioning: positioning,
          verdict: verdict,
          key_takeaway: keyInsight,
          
          strengths,
          weaknesses,
          risks,
          opportunities,
          
          scores
        }
      };

    } catch (error) {
      throw new Error(`Failed to fetch client: ${error.message}`);
    }
  }

  /**
   * SEED (UNCHANGED)
   */
  static async seedClients(clientsData = []) {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      if (!clientsData || clientsData.length === 0) {
        clientsData = [
          {
            name: "Stripe",
            industry: "Fintech",
            overview: "Online payment infrastructure platform",
            offerings: ["Payments API", "Billing"],
            capabilities: ["Scalable APIs", "Global payments"],
            benefits: ["Easy integration"],
            differentiators: ["Developer-first"],
            pricing: "Usage-based"
          }
        ];
      }

      let inserted = 0;
      let skipped = 0;

      for (const data of clientsData) {

        const res = await client.query(`
          INSERT INTO clients (name, industry, overview)
          VALUES ($1, $2, $3)
          ON CONFLICT (name) DO NOTHING
          RETURNING id
        `, [data.name, data.industry, data.overview]);

        if (res.rows.length === 0) {
          skipped++;
          continue;
        }

        const clientId = res.rows[0].id;

        await client.query(`
          INSERT INTO client_details 
          (client_id, offerings, capabilities, benefits, differentiators, pricing)
          VALUES ($1, $2, $3, $4, $5, $6)
          ON CONFLICT (client_id) DO NOTHING
        `, [
          clientId,
          data.offerings,
          data.capabilities,
          data.benefits,
          data.differentiators,
          data.pricing
        ]);

        inserted++;
      }

      await client.query('COMMIT');

      return { inserted, skipped };

    } catch (error) {
      await client.query('ROLLBACK');
      throw new Error(error.message);
    } finally {
      client.release();
    }
  }
}

module.exports = ClientService;