const pool = require('../db/connection');
const IntelligenceEngine = require('../intelligence/engine');
const DataCompatibility = require('./dataCompatibility');

class ClientService {

  // 🔥 Normalize intelligence structure (MAIN FIX)
  static normalizeIntelligence(raw, details) {
    return {
      overall_score: raw?.overall_score || 80,
      positioning: raw?.positioning || "Challenger",
      verdict: raw?.verdict || "Moderate",
      key_takeaway: raw?.key_takeaway || "",

      strengths: raw?.strengths || details?.capabilities || [],
      weaknesses: raw?.weaknesses || details?.differentiators || [],
      risks: raw?.risks || [],
      opportunities: raw?.opportunities || [],

      scores: {
        differentiation: raw?.differentiator_score || 80,
        market: raw?.market_score || 80,
        product: raw?.product_score || 80,
        pricing: raw?.pricing_score || 80,
        moat: raw?.moat_score || 80
      }
    };
  }

  /**
   * Get all clients
   */
  static async getAllClients(search = '', industry = '') {
    try {
      let query = `
        SELECT 
          c.id,
          c.name,
          c.industry,
          c.overview,
          LEFT(c.overview, 100) as overview_short,
          cd.offerings,
          cd.capabilities,
          cd.benefits,
          cd.differentiators,
          cd.pricing,
          c.created_at
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
        const details = {
          offerings: row.offerings || [],
          capabilities: row.capabilities || [],
          benefits: row.benefits || [],
          differentiators: row.differentiators || [],
          pricing: row.pricing
        };

        const raw = IntelligenceEngine.generateIntelligence(
          {
            id: row.id,
            name: row.name,
            industry: row.industry,
            overview: row.overview
          },
          details
        );

        const intelligence = this.normalizeIntelligence(raw, details);

        return {
          id: row.id,
          name: row.name,
          industry: row.industry,
          overview_short: row.overview_short,

          score: intelligence.overall_score,
          positioning: intelligence.positioning,
          verdict: intelligence.verdict,
          key_insight: intelligence.key_takeaway,

          offering_count: details.offerings.length,
          capability_count: details.capabilities.length,

          created_at: row.created_at,
          original_id: row.id, // 🔥 important

          details
        };
      });

      // Compatibility layer
      transformedData = DataCompatibility.transformForFrontend(transformedData);
      transformedData = DataCompatibility.addMissingCompany(transformedData);

      return transformedData;

    } catch (error) {
      throw new Error(`Failed to fetch clients: ${error.message}`);
    }
  }

  static async getClientById(id) {
    try {
      const allClients = await this.getAllClients();
      const client = allClients.find(c => c.id == id);

      if (!client) throw new Error('Client not found');

      // 🔥 Synthetic (CloudMesh case)
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
            overall_score: client.score,
            positioning: client.positioning,
            verdict: client.verdict,
            key_takeaway: client.key_insight,

            strengths: ["Strong positioning", "Growing adoption"],
            weaknesses: ["Limited scale", "Niche focus"],
            risks: ["Competition", "Market saturation"],
            opportunities: ["Expansion", "New features"],

            scores: {
              differentiation: 70,
              market: 72,
              product: 75,
              pricing: 78,
              moat: 68
            }
          }
        };
      }
      
      const result = await pool.query(`
        SELECT 
          c.id,
          c.name,
          c.industry,
          c.overview,
          cd.offerings,
          cd.capabilities,
          cd.benefits,
          cd.differentiators,
          cd.pricing,
          c.created_at
        FROM clients c
        LEFT JOIN client_details cd ON c.id = cd.client_id
        WHERE c.id = $1
      `, [client.original_id]);

      if (result.rows.length === 0) {
        throw new Error('Client not found');
      }

      const row = result.rows[0];

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

      const raw = IntelligenceEngine.generateIntelligence(clientData, details);
      const intelligence = this.normalizeIntelligence(raw, details);

      return {
        client: clientData,
        details,
        intelligence
      };

    } catch (error) {
      throw new Error(`Failed to fetch client: ${error.message}`);
    }
  }

  /**
   * Seed
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