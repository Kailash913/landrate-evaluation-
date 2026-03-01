import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Droplets, Sun, Cloud, Sprout } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

const landUseData = [
  { label: "Agricultural", value: 65, recommended: true },
  { label: "Residential", value: 20, recommended: false },
  { label: "Commercial", value: 15, recommended: false },
];

const crops = [
  { name: "Rice", suitability: 88, water: "High", season: "Kharif", color: "bg-primary" },
  { name: "Maize", suitability: 76, water: "Medium", season: "Kharif", color: "bg-amber" },
  { name: "Wheat", suitability: 45, water: "Low", season: "Rabi", color: "bg-blue" },
  { name: "Sugarcane", suitability: 82, water: "High", season: "Annual", color: "bg-teal" },
  { name: "Cotton", suitability: 60, water: "Medium", season: "Kharif", color: "bg-amber" },
  { name: "Soybean", suitability: 72, water: "Medium", season: "Kharif", color: "bg-primary" },
];

const waterData = [
  { month: "Jan", Rainfall: 15, Demand: 30 },
  { month: "Feb", Rainfall: 10, Demand: 35 },
  { month: "Mar", Rainfall: 20, Demand: 45 },
  { month: "Apr", Rainfall: 40, Demand: 50 },
  { month: "May", Rainfall: 80, Demand: 55 },
  { month: "Jun", Rainfall: 150, Demand: 60 },
  { month: "Jul", Rainfall: 200, Demand: 65 },
  { month: "Aug", Rainfall: 180, Demand: 60 },
  { month: "Sep", Rainfall: 140, Demand: 55 },
  { month: "Oct", Rainfall: 90, Demand: 45 },
  { month: "Nov", Rainfall: 30, Demand: 35 },
  { month: "Dec", Rainfall: 10, Demand: 30 },
];

const rotationSteps = [
  { crop: "Rice", period: "Jun–Oct", icon: Sprout },
  { crop: "Wheat", period: "Nov–Mar", icon: Sun },
  { crop: "Legumes", period: "Apr–May", icon: Cloud },
];

export function AgriculturalInsightsPage() {
  const [activeTab, setActiveTab] = useState("landuse");

  return (
    <div className="max-w-6xl">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="landuse">Land Use</TabsTrigger>
          <TabsTrigger value="crops">Crop Grid</TabsTrigger>
          <TabsTrigger value="water">Water Indicator</TabsTrigger>
        </TabsList>

        <TabsContent value="landuse">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-6 space-y-5">
            <h3 className="text-sm font-semibold text-foreground">Land Use Comparison</h3>
            {landUseData.map((item) => (
              <div key={item.label} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                    {item.recommended && <span className="badge-emerald text-[10px]">Recommended</span>}
                  </div>
                  <span className="text-sm font-semibold text-foreground">{item.value}%</span>
                </div>
                <Progress value={item.value} className="h-3 rounded-full" />
              </div>
            ))}
          </motion.div>
        </TabsContent>

        <TabsContent value="crops">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {crops.map((crop, i) => (
                <motion.div
                  key={crop.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="glass-card-hover p-5"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-foreground">{crop.name}</h4>
                    <span className={`badge-${crop.season === "Rabi" ? "blue" : crop.season === "Annual" ? "teal" : "emerald"}`}>
                      {crop.season}
                    </span>
                  </div>
                  {/* Circular suitability */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className="relative w-14 h-14">
                      <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                        <circle cx="28" cy="28" r="22" fill="none" stroke="hsl(var(--muted))" strokeWidth="5" />
                        <circle
                          cx="28" cy="28" r="22" fill="none"
                          stroke="hsl(var(--emerald))"
                          strokeWidth="5"
                          strokeDasharray={`${(crop.suitability / 100) * 138} 138`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-foreground">
                        {crop.suitability}%
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Droplets className="w-3 h-3" />
                        <span>Water: {crop.water}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Suitability Score</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Crop Rotation Timeline */}
            <div className="glass-card p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Crop Rotation Timeline</h3>
              <div className="flex items-center gap-2">
                {rotationSteps.map((step, i) => (
                  <div key={step.crop} className="flex items-center flex-1">
                    <div className="flex-1 bg-muted rounded-xl p-3 text-center">
                      <step.icon className="w-5 h-5 mx-auto mb-1 text-primary" />
                      <p className="text-xs font-semibold text-foreground">{step.crop}</p>
                      <p className="text-[10px] text-muted-foreground">{step.period}</p>
                    </div>
                    {i < rotationSteps.length - 1 && (
                      <div className="w-6 h-0.5 bg-border flex-shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </TabsContent>

        <TabsContent value="water">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">Rainfall vs Demand (mm)</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={waterData} barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
                  <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(215, 15%, 50%)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 15%, 50%)" />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(0, 0%, 100%)",
                      border: "1px solid hsl(214, 20%, 90%)",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="Rainfall" fill="hsl(217, 91%, 50%)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Demand" fill="hsl(38, 92%, 50%)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
