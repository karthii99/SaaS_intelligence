import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Crown, Swords, Circle } from "lucide-react";

const positioningConfig = {
  Leader: { style: "bg-success/15 text-success border-success/30", icon: Crown },
  Challenger: { style: "bg-warning/15 text-warning border-warning/30", icon: Swords },
  Niche: { style: "bg-muted text-muted-foreground border-border", icon: Circle },
};

const getScoreColor = (score: number) => {
  if (score >= 85) return "text-success";
  if (score >= 70) return "text-warning";
  return "text-destructive";
};

const ClientCardList = ({ client }: { client: any }) => {
  const navigate = useNavigate();
  const pos = positioningConfig[client.positioning];
  const PosIcon = pos?.icon;

  // Safe fallbacks
  const posStyle = pos?.style || "bg-muted text-muted-foreground border-border";

  return (
    <div
      onClick={() => navigate(`/client/${client.id}`)}
      className="group flex items-center gap-4 rounded-xl bg-card border border-card-border px-5 py-3.5 cursor-pointer transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
    >
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate text-sm">
          {client.name}
        </h3>
      </div>
      <Badge variant="outline" className="text-xs font-medium bg-secondary/50 shrink-0">
        {client.industry}
      </Badge>
      <div className={`text-lg font-bold ${getScoreColor(client.score)} shrink-0 tabular-nums`}>
        {client.score}
      </div>
      <Badge className={`text-xs border gap-1 shrink-0 ${posStyle}`}>
        {PosIcon && <PosIcon className="h-3 w-3" />}
        {client.positioning}
      </Badge>
    </div>
  );
};

export default ClientCardList;
