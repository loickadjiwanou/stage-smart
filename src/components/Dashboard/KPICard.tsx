import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  description?: string;
  gradient?: boolean;
}

export default function KPICard({
  title,
  value,
  change,
  changeType = "neutral",
  icon: Icon,
  description,
  gradient = false
}: KPICardProps) {
  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300 hover:shadow-card hover:bg-card-hover",
      gradient && "bg-gradient-card"
    )}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-2">
              {title}
            </p>
            <div className="flex items-baseline space-x-2">
              <h3 className="text-2xl font-bold text-foreground">
                {value}
              </h3>
              {change && (
                <span className={cn(
                  "text-xs font-medium px-2 py-1 rounded-full",
                  changeType === "positive" && "text-success bg-success/10",
                  changeType === "negative" && "text-danger bg-danger/10",
                  changeType === "neutral" && "text-muted-foreground bg-muted"
                )}>
                  {change}
                </span>
              )}
            </div>
            {description && (
              <p className="text-xs text-muted-foreground mt-2">
                {description}
              </p>
            )}
          </div>
          <div className={cn(
            "p-3 rounded-lg",
            gradient ? "bg-white/20" : "bg-primary/10"
          )}>
            <Icon className={cn(
              "h-6 w-6",
              gradient ? "text-white" : "text-primary"
            )} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}