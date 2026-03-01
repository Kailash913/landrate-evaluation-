import { useState, useCallback, useEffect } from "react";
import { Search, Navigation } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface NutrientBarProps {
  label: string;
  value: number;
  max: number;
  unit: string;
  color: string;
}

function NutrientBar({ label, value, max, unit, color }: NutrientBarProps) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-foreground">{label}</span>
        <span className="text-xs font-semibold" style={{ color }}>{value} {unit}</span>
      </div>
      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-full rounded-full"
          style={{ background: color }}
        />
      </div>
    </div>
  );
}

function LocationMarker({ position, onPositionChange }: {
  position: [number, number];
  onPositionChange: (pos: [number, number]) => void;
}) {
  useMapEvents({
    click(e) {
      onPositionChange([e.latlng.lat, e.latlng.lng]);
    },
  });

  return <Marker position={position} icon={customIcon} />;
}

export function InteractiveMapPage() {
  const [position, setPosition] = useState<[number, number]>([12.9716, 77.5946]);
  const [searchQuery, setSearchQuery] = useState("");

  const handlePositionChange = useCallback((pos: [number, number]) => {
    setPosition(pos);
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-[calc(100vh-8rem)]">
      {/* Map Panel — 60% */}
      <div className="lg:col-span-3 relative glass-card overflow-hidden">
        <MapContainer
          center={position}
          zoom={13}
          className="h-full w-full z-0"
          style={{ minHeight: "400px", borderRadius: "1rem" }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker position={position} onPositionChange={handlePositionChange} />
        </MapContainer>

        {/* Floating search bar */}
        <div className="absolute top-4 left-4 right-4 z-[1000]">
          <div className="flex items-center gap-2 bg-card/90 backdrop-blur-md rounded-xl px-4 py-2.5 shadow-md border border-border/50 max-w-sm">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search location or coordinates..."
              className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground/60"
            />
          </div>
        </div>

        {/* Compass */}
        <div className="absolute bottom-4 right-4 z-[1000] w-10 h-10 rounded-full bg-card/90 backdrop-blur border border-border/50 flex items-center justify-center shadow-sm">
          <Navigation className="w-4 h-4 text-primary" />
        </div>
      </div>

      {/* Metadata Panel — 40% */}
      <div className="lg:col-span-2 space-y-4 overflow-y-auto">
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Geographic Metadata</h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Coordinates</p>
              <p className="text-sm font-medium text-foreground">
                {position[0].toFixed(4)}° N, {position[1].toFixed(4)}° E
              </p>
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

        {/* Soil Health Panel */}
        <div className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">Soil Health Indicators</h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Soil pH</p>
              <div className="flex items-center gap-3">
                <div className="flex-1 relative h-3 rounded-full overflow-hidden bg-gradient-to-r from-destructive via-accent to-primary">
                  <motion.div
                    initial={{ left: "0%" }}
                    animate={{ left: "55%" }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-card border-2 border-foreground shadow-sm"
                    style={{ transform: "translate(-50%, -50%)" }}
                  />
                </div>
                <span className="text-sm font-semibold text-foreground min-w-[2.5rem] text-right">6.8</span>
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[10px] text-muted-foreground">Acidic (4)</span>
                <span className="text-[10px] text-primary font-medium">Optimal</span>
                <span className="text-[10px] text-muted-foreground">Alkaline (9)</span>
              </div>
            </div>

            <div className="pt-2 border-t border-border/50">
              <p className="text-xs text-muted-foreground mb-3">NPK Values (kg/ha)</p>
              <div className="space-y-3">
                <NutrientBar label="Nitrogen (N)" value={285} max={500} unit="kg/ha" color="hsl(160, 84%, 39%)" />
                <NutrientBar label="Phosphorus (P)" value={42} max={100} unit="kg/ha" color="hsl(217, 91%, 50%)" />
                <NutrientBar label="Potassium (K)" value={198} max={400} unit="kg/ha" color="hsl(38, 92%, 50%)" />
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
