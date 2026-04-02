import { LucideIcon } from "lucide-react";

interface InsightPanelProps {
  title: string;
  icon: LucideIcon;
  items: string[];
  accentClass: string;
}

const InsightPanel = ({ title, icon: Icon, items, accentClass }: InsightPanelProps) => {
  return (
    <div className={`rounded-xl bg-card border border-card-border p-5`}>
      <div className="flex items-center gap-2.5 mb-4">
        <div className={`rounded-lg p-2 ${accentClass}`}>
          <Icon className="h-4 w-4" />
        </div>
        <h3 className="font-semibold text-foreground text-sm">{title}</h3>
      </div>
      <ul className="space-y-2.5">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
            <span className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${accentClass.replace(/\/\d+/g, '').includes('success') ? 'bg-success' : accentClass.includes('destructive') ? 'bg-destructive' : accentClass.includes('info') ? 'bg-info' : 'bg-warning'}`} />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InsightPanel;
