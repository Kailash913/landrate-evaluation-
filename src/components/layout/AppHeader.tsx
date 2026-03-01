import { MapPin, Plus } from "lucide-react";
import { useNavigation } from "@/contexts/NavigationContext";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  const { pageTitle } = useNavigation();

  return (
    <header className="h-16 border-b border-border bg-card/60 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold text-foreground">{pageTitle}</h1>
        <div className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
          <MapPin className="w-3.5 h-3.5" />
          <span>Lat 12.97, Lng 77.59</span>
        </div>
      </div>
      <Button size="sm" className="gap-2">
        <Plus className="w-4 h-4" />
        New Evaluation
      </Button>
    </header>
  );
}
