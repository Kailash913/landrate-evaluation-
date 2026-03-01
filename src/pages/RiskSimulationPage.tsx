import { AlertTriangle, Flame, CloudRain, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

const risks = [
  { label: "Flood Zone Proximity", level: "high" as const, icon: CloudRain, detail: "Within 2km of flood plain" },
  { label: "Soil Erosion Risk", level: "moderate" as const, icon: TrendingDown, detail: "Moderate slope gradient" },
  { label: "Wildfire Susceptibility", level: "low" as const, icon: Flame, detail: "Low vegetation density" },
  { label: "Seismic Activity", level: "low" as const, icon: AlertTriangle, detail: "Zone II — Low risk" },
];

const levelConfig = {
  high: { border: "risk-border-high", badge: "bg-destructive/10 text-destructive" },
  moderate: { border: "risk-border-moderate", badge: "bg-accent/10 text-accent" },
  low: { border: "risk-border-low", badge: "bg-primary/10 text-primary" },
};

export function RiskSimulationPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      {/* Risk Cards */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Risk Assessment</h3>
        <div className="space-y-3">
          {risks.map((risk, i) => (
            <motion.div
              key={risk.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`glass-card p-4 ${levelConfig[risk.level].border} flex items-center gap-4`}
            >
              <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <risk.icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{risk.label}</p>
                <p className="text-xs text-muted-foreground">{risk.detail}</p>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${levelConfig[risk.level].badge}`}>
                {risk.level}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
