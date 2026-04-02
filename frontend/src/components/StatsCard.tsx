import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  trend?: string;
}

const StatsCard = ({ icon: Icon, value, label, trend }: StatsCardProps) => {
  return (
    <div className="rounded-xl bg-card border border-card-border p-5 flex items-start gap-4 transition-colors hover:bg-card-hover">
      <div className="rounded-lg bg-primary/10 p-2.5">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-2xl font-bold tracking-tight text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground mt-0.5">{label}</p>
        {trend && (
          <p className="text-xs text-success mt-1 font-medium">{trend}</p>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
