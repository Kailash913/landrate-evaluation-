import { TrendingUp, Brain, BarChart3, Droplets, Mountain, Building2, Route, Leaf, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const confidenceData = [
  { name: "Confidence", value: 78 },
  { name: "Remaining", value: 22 },
];

const factors = [
  { label: "Soil Quality", value: 85, icon: Mountain },
  { label: "Water Access", value: 70, icon: Droplets },
  { label: "Road Proximity", value: 92, icon: Route },
  { label: "Urban Distance", value: 60, icon: Building2 },
  { label: "Vegetation Index", value: 75, icon: Leaf },
  { label: "Power Grid", value: 88, icon: Zap },
];

export function ValuationEnginePage() {
  return (
    <div className="space-y-6 max-w-6xl">
      {/* Top stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Market Rate", value: "₹4,850", sub: "/sq.ft", accent: "stat-card-emerald", icon: TrendingUp },
          { label: "ML Predicted", value: "₹5,120", sub: "/sq.ft", accent: "stat-card-blue", icon: Brain },
          { label: "Baseline", value: "₹4,500", sub: "/sq.ft", accent: "stat-card-amber", icon: BarChart3 },
        ].map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`stat-card ${card.accent}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">{card.label}</p>
                <p className="text-2xl font-bold text-foreground mt-1">
                  {card.value}
                  <span className="text-sm font-normal text-muted-foreground">{card.sub}</span>
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                <card.icon className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Confidence Meter + Formula */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass-card p-6 flex flex-col items-center">
          <h3 className="text-sm font-semibold text-foreground mb-4">Confidence Meter</h3>
          <div className="w-40 h-40 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={confidenceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                  strokeWidth={0}
                >
                  <Cell fill="hsl(160, 84%, 39%)" />
                  <Cell fill="hsl(210, 15%, 92%)" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-foreground">78%</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Model prediction confidence</p>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Valuation Formula</h3>
          <div className="bg-muted rounded-xl p-4 font-mono text-sm text-foreground">
            <p className="text-muted-foreground text-xs mb-2">Final Rate Calculation</p>
            <p className="text-base font-semibold">
              Final Rate = (0.6 × ML) + (0.4 × Baseline)
            </p>
            <div className="mt-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">ML Predicted</span>
                <span>₹5,120 × 0.6 = ₹3,072</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Baseline</span>
                <span>₹4,500 × 0.4 = ₹1,800</span>
              </div>
              <hr className="border-border" />
              <div className="flex justify-between font-semibold text-sm">
                <span>Final Rate</span>
                <span className="text-primary">₹4,872 /sq.ft</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Influencing Factors */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">Influencing Factors</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {factors.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="glass-card-hover p-4 flex items-center gap-4"
            >
              <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                <f.icon className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground">{f.label}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Progress value={f.value} className="flex-1 h-1.5" />
                  <span className="text-xs text-muted-foreground">{f.value}%</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
