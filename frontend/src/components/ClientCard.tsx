import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Crown, Swords, Circle, Package, Cog, ShieldCheck, ShieldAlert, ShieldX } from "lucide-react";

const positioningConfig = {
  Leader: { style: "bg-success/15 text-success border-success/30", icon: Crown },
  Challenger: { style: "bg-warning/15 text-warning border-warning/30", icon: Swords },
  Niche: { style: "bg-muted text-muted-foreground border-border", icon: Circle },
};

const verdictConfig = {
  Strong: { style: "bg-success/15 text-success border-success/30", icon: ShieldCheck, label: "Strong Candidate" },
  Moderate: { style: "bg-warning/15 text-warning border-warning/30", icon: ShieldAlert, label: "Moderate Risk" },
  Weak: { style: "bg-destructive/15 text-destructive border-destructive/30", icon: ShieldX, label: "High Risk" },
};

const decisionSignalStyles: Record<string, string> = {
  "High Growth Potential": "bg-success/10 text-success border-success/20",
  "Market Leader": "bg-info/10 text-info border-info/20",
  "Emerging Player": "bg-primary/10 text-primary border-primary/20",
  "Niche Specialist": "bg-muted text-muted-foreground border-border",
  "Watch Closely": "bg-warning/10 text-warning border-warning/20",
};

const getScoreColor = (score: number) => {
  if (score >= 85) return "text-success";
  if (score >= 70) return "text-warning";
  return "text-destructive";
};

const getScoreBg = (score: number) => {
  if (score >= 85) return "bg-success/10 ring-success/20";
  if (score >= 70) return "bg-warning/10 ring-warning/20";
  return "bg-destructive/10 ring-destructive/20";
};

const ClientCard = ({ client }: { client: any }) => {
  const navigate = useNavigate();
  const pos = positioningConfig[client.positioning];
  const PosIcon = pos?.icon;
  const vrd = verdictConfig[client.verdict];
  const VrdIcon = vrd?.icon;
  const signalStyle = decisionSignalStyles[client.decisionSignal] || "bg-muted text-muted-foreground border-border";

  // Safe fallbacks for undefined values
  const posStyle = pos?.style || "bg-muted text-muted-foreground border-border";
  const vrdStyle = vrd?.style || "bg-muted text-muted-foreground border-border";
  const vrdLabel = vrd?.label || client.verdict || "Unknown";

  return (
    <div
      onClick={() => navigate(`/client/${client.id}`)}
      className="group rounded-xl bg-card border border-card-border p-5 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
    >
      {/* Header: Name + Score */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
            {client.name}
          </h3>
          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
            <Badge variant="outline" className="text-xs font-medium bg-secondary/50">
              {client.industry}
            </Badge>
            <Badge className={`text-xs border gap-1 ${vrdStyle}`}>
              {VrdIcon && <VrdIcon className="h-3 w-3" />}
              {vrdLabel}
            </Badge>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <div className={`text-2xl font-bold ${getScoreColor(client.score)} px-2.5 py-0.5 rounded-lg ring-1 ${getScoreBg(client.score)}`}>
            {client.score}
          </div>
          <Badge className={`text-xs border gap-1 ${posStyle}`}>
              {PosIcon && <PosIcon className="h-3 w-3" />}
              {client.positioning}
            </Badge>
        </div>
      </div>

      {/* Overview */}
      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
        {client.overview_short || client.overview || 'No overview available'}
      </p>

      {/* Micro Metrics */}
      <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Package className="h-3 w-3" />
          {client.details?.offerings?.length || 0} offerings
        </span>
        <span className="flex items-center gap-1">
          <Cog className="h-3 w-3" />
          {client.details?.capabilities?.length || 0} capabilities
        </span>
      </div>

      {/* Decision Signal */}
      <div className="mb-3">
        <Badge className={`text-xs border ${signalStyle}`}>
          {client.decisionSignal || client.verdict || 'Unknown'}
        </Badge>
      </div>

      {/* Insight */}
      <div className="flex items-start gap-1.5 pt-3 border-t border-border bg-secondary/30 -mx-5 -mb-5 px-5 py-3 rounded-b-xl">
        <Sparkles className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
        <p className="text-xs text-muted-foreground leading-relaxed italic">{client.insight || client.key_insight || 'No insight available'}</p>
      </div>
    </div>
  );
};

export default ClientCard;
