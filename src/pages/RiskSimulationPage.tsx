import { useState, useMemo } from "react";
import { AlertTriangle, Shield, Flame, CloudRain, TrendingDown } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const risks = [
  { label: "Flood Zone Proximity", level: "high" as const, icon: CloudRain, detail: "Within 2km of flood plain" },
  { label: "Soil Erosion Risk", level: "moderate" as const, icon: TrendingDown, detail: "Moderate slope gradient" },
  { label: "Wildfire Susceptibility", level: "low" as const, icon: Flame, detail: "Low vegetation density" },
  { label: "Seismic Activity", level: "low" as const, icon: AlertTriangle, detail: "Zone II — Low risk" },
  { label: "Legal Encumbrance", level: "moderate" as const, icon: Shield, detail: "Pending survey verification" },
];

const levelConfig = {
  high: { border: "risk-border-high", badge: "bg-destructive/10 text-destructive" },
  moderate: { border: "risk-border-moderate", badge: "bg-accent/10 text-accent" },
  low: { border: "risk-border-low", badge: "bg-primary/10 text-primary" },
};

function generateProjection(urban: number, infra: number) {
  const base = 4872;
  return Array.from({ length: 6 }, (_, i) => {
    const year = 2024 + i;
    const urbanEffect = (urban / 100) * i * 180;
    const infraEffect = (infra / 100) * i * 120;
    return {
      year: year.toString(),
      value: Math.round(base + urbanEffect + infraEffect + Math.random() * 100),
    };
  });
}

export function RiskSimulationPage() {
  const [urbanGrowth, setUrbanGrowth] = useState(40);
  const [infraDev, setInfraDev] = useState(55);

  const projectionData = useMemo(() => generateProjection(urbanGrowth, infraDev), [urbanGrowth, infraDev]);

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

      {/* What-If Simulator */}
      <div className="glass-card p-6">
        <h3 className="text-sm font-semibold text-foreground mb-5">What-If Simulator</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-foreground">Urban Growth</label>
              <span className="text-xs font-semibold text-primary">{urbanGrowth}%</span>
            </div>
            <Slider
              value={[urbanGrowth]}
              onValueChange={([v]) => setUrbanGrowth(v)}
              max={100}
              step={5}
              className="w-full"
            />
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-foreground">Infrastructure Development</label>
              <span className="text-xs font-semibold text-primary">{infraDev}%</span>
            </div>
            <Slider
              value={[infraDev]}
              onValueChange={([v]) => setInfraDev(v)}
              max={100}
              step={5}
              className="w-full"
            />
          </div>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={projectionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
              <XAxis dataKey="year" tick={{ fontSize: 12 }} stroke="hsl(215, 15%, 50%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 15%, 50%)" />
              <Tooltip
                contentStyle={{
                  background: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(214, 20%, 90%)",
                  borderRadius: "12px",
                  fontSize: "12px",
                }}
                formatter={(value: number) => [`₹${value.toLocaleString()}`, "Projected Rate"]}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(160, 84%, 39%)"
                strokeWidth={2.5}
                dot={{ fill: "hsl(160, 84%, 39%)", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
