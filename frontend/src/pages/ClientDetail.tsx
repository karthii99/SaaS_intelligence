import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, Shield, AlertTriangle, Lightbulb, Target, TrendingUp, BadgeCheck, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InsightPanel from "@/components/InsightPanel";
import ScoreBar from "@/components/ScoreBar";
import ScoreRing from "@/components/ScoreRing";

const verdictStyles = {
  Strong: "bg-success/15 text-success border-success/30",
  Moderate: "bg-warning/15 text-warning border-warning/30", 
  Weak: "bg-destructive/15 text-destructive border-destructive/30",
};

const positioningStyles = {
  Leader: "bg-success/15 text-success border-success/30",
  Challenger: "bg-warning/15 text-warning border-warning/30",
  Niche: "bg-muted text-muted-foreground border-border",
};

const ClientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [client, setClient] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use environment variable or fallback to production URL
    const apiUrl = import.meta.env.VITE_API_URL || "https://saas-intelligence.onrender.com";
    console.log("🔗 Using API URL:", apiUrl);
    
    // Add cache-busting timestamp
    const timestamp = new Date().getTime();
    
    fetch(`${apiUrl}/api/clients/${id}?t=${timestamp}`)
      .then(res => res.json())
      .then(data => {
        const api = data.data;
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
          strengths: api.intelligence.strengths || ["Strong market positioning", "Growing customer base", "Competitive pricing"],
          risks: api.intelligence.risks || ["Market competition", "Technology complexity"],
          opportunities: api.intelligence.opportunities || ["Market expansion", "Feature enhancement", "Partnership opportunities"],
          weaknesses: api.intelligence.weaknesses || ["Limited brand recognition", "Smaller market share"],
          scores: {
            differentiation: api.intelligence.scores?.differentiation || 0,
            market: api.intelligence.scores?.market || 0,
            product: api.intelligence.scores?.product || 0,
            pricing: api.intelligence.scores?.pricing || 0,
            moat: api.intelligence.scores?.moat || 0,
          },
          scoreInterpretations: {
            differentiation: "Strong competitive advantage",
            market: "Well-positioned in growing market", 
            product: "Best-in-class product quality",
            pricing: "Competitive pricing strategy",
            moat: "High barrier to entry for competitors",
          },
          details: api.details
        };

        console.log('🔍 Transformed client data:', transformed);
        console.log('📊 Client details check:');
        console.log('- Strengths:', transformed.strengths?.length || 0, 'items');
        console.log('- Risks:', transformed.risks?.length || 0, 'items');
        console.log('- Opportunities:', transformed.opportunities?.length || 0, 'items');
        console.log('- Details offerings:', transformed.details?.offerings?.length || 0, 'items');
        console.log('- Verdict:', transformed.verdict);
        console.log('- Positioning:', transformed.positioning);
        console.log('- Scores:', transformed.scores);
        
        // Additional safety check for client 1
        if (id === '1') {
          console.log('🚨 Client 1 Special Check:');
          console.log('- All arrays populated:', !!transformed.strengths && !!transformed.risks && !!transformed.opportunities);
          console.log('- Details object exists:', !!transformed.details);
          console.log('- Score values valid:', Object.values(transformed.scores).every(v => v > 0));
        }
        
        setClient(transformed);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching client:", err);
        setLoading(false);
      });
  }, [id]);

  // 🔄 Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading client...</p>
      </div>
    );
  }

  // ❌ Not found
  if (!client) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Client not found</p>
          <Button variant="ghost" className="mt-4" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Back */}
        <Button variant="ghost" className="mb-6 text-muted-foreground hover:text-foreground" onClick={() => navigate("/")}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
        </Button>

        {/* Header */}
        <div className="rounded-xl bg-card border border-card-border p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-foreground">{client.name}</h1>
                <Badge className={`border ${positioningStyles[client.positioning]}`}>
                  {client.positioning}
                </Badge>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline">{client.industry}</Badge>

                <Badge className={`border ${verdictStyles[client.verdict]}`}>
                  <BadgeCheck className="h-3 w-3 mr-1" />
                  {client.verdict}
                </Badge>

                <Badge variant="outline" className="text-xs text-primary border-primary/30">
                  {client.decisionSignal}
                </Badge>
              </div>
            </div>

            <ScoreRing score={client.score} />
          </div>

          <p className="text-muted-foreground text-sm mt-4 max-w-3xl">
            {client.overview}
          </p>
        </div>

        {/* Best Fit */}
        <div className="rounded-xl bg-card border border-card-border p-5 mb-6">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <Users className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase font-medium mb-1">
                Best Fit
              </p>
              <p className="text-sm text-foreground italic">
                {client.bestFit}
              </p>
            </div>
          </div>
        </div>

        {/* Intelligence Panels */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" /> Intelligence Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InsightPanel title="Strengths" icon={Shield} items={client.strengths} accentClass="text-success" />
            <InsightPanel title="Risks" icon={AlertTriangle} items={client.risks} accentClass="text-warning" />
            <InsightPanel title="Opportunities" icon={Lightbulb} items={client.opportunities} accentClass="text-primary" />
            <InsightPanel title="Weaknesses" icon={Target} items={client.weaknesses} accentClass="text-muted-foreground" />
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="rounded-xl bg-card border p-6 mb-6">
          <h2 className="text-lg font-semibold mb-5">Score Breakdown</h2>

          <div className="space-y-4 max-w-xl">
            <ScoreBar label="Differentiation" value={client.scores.differentiation} />
            <ScoreBar label="Market" value={client.scores.market} />
            <ScoreBar label="Product" value={client.scores.product} />
            <ScoreBar label="Pricing" value={client.scores.pricing} />
            <ScoreBar label="Moat" value={client.scores.moat} />
          </div>
        </div>

        {/* Details Tabs */}
        <div className="rounded-xl bg-card border p-6">
          <Tabs defaultValue="overview">

            <TabsList className="mb-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="offerings">Offerings</TabsTrigger>
              <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
              <TabsTrigger value="differentiators">Differentiators</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <p className="text-sm text-muted-foreground">{client.overview}</p>
            </TabsContent>

            {["offerings", "capabilities", "benefits", "differentiators"].map((tab) => (
              <TabsContent key={tab} value={tab}>
                <ul className="space-y-2">
                  {client.details?.[tab]?.map((item: string, i: number) => (
                    <li key={i} className="text-sm text-muted-foreground">
                      • {item}
                    </li>
                  ))}
                </ul>
              </TabsContent>
            ))}

            <TabsContent value="pricing">
              <p className="text-sm text-muted-foreground">
                {client.details?.pricing}
              </p>
            </TabsContent>

          </Tabs>
        </div>

      </div>
    </div>
  );
};

export default ClientDetail;