import { Search, MapPin, Navigation } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

export function InteractiveMapPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-[calc(100vh-8rem)]">
      {/* Map Panel — 60% */}
      <div className="lg:col-span-3 relative glass-card overflow-hidden flex items-center justify-center">
        {/* Stylized map placeholder */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-light via-card to-blue-light opacity-60" />
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          opacity: 0.4,
        }} />

        {/* Animated pin */}
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
          className="relative z-10 flex flex-col items-center"
        >
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg">
            <MapPin className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="w-3 h-3 bg-primary/30 rounded-full mt-1 animate-pulse-slow" />
          <span className="mt-3 text-xs font-medium text-muted-foreground bg-card/90 px-3 py-1 rounded-full shadow-sm">
            12.9716° N, 77.5946° E
          </span>
        </motion.div>

        {/* Floating search bar */}
        <div className="absolute top-4 left-4 right-4 z-20">
          <div className="flex items-center gap-2 bg-card/90 backdrop-blur-md rounded-xl px-4 py-2.5 shadow-md border border-border/50 max-w-sm">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search location or coordinates..."
              className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground/60"
            />
          </div>
        </div>

        {/* Compass */}
        <div className="absolute bottom-4 right-4 z-20 w-10 h-10 rounded-full bg-card/90 backdrop-blur border border-border/50 flex items-center justify-center shadow-sm">
          <Navigation className="w-4 h-4 text-primary" />
        </div>
      </div>

      {/* Metadata Panel — 40% */}
      <div className="lg:col-span-2 space-y-4">
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Geographic Metadata</h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Coordinates</p>
              <p className="text-sm font-medium text-foreground">12.9716° N, 77.5946° E</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Soil Type</p>
              <span className="badge-blue">Red Laterite</span>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Climate Zone</p>
              <span className="badge-teal">Tropical Savanna (Aw)</span>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Infrastructure Score</p>
              <div className="flex items-center gap-3">
                <Progress value={72} className="flex-1 h-2" />
                <span className="text-sm font-semibold text-primary">72%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3">Nearby Landmarks</h3>
          <div className="space-y-2">
            {[
              { name: "National Highway 44", dist: "1.2 km" },
              { name: "Agricultural Market Yard", dist: "3.5 km" },
              { name: "Railway Station", dist: "5.8 km" },
            ].map((l) => (
              <div key={l.name} className="flex items-center justify-between text-sm">
                <span className="text-foreground">{l.name}</span>
                <span className="text-muted-foreground text-xs">{l.dist}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3">Elevation Profile</h3>
          <div className="flex items-end gap-1 h-16">
            {[30, 45, 60, 55, 70, 65, 50, 40, 55, 65, 75, 60].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="flex-1 bg-primary/20 rounded-t-sm"
                style={{ minHeight: 4 }}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">Avg. 920m above sea level</p>
        </div>
      </div>
    </div>
  );
}
