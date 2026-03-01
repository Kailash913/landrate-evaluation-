import { useState } from "react";
import { Download, FileSpreadsheet, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const evaluations = [
  { date: "2024-11-15", location: "Bangalore Rural", rate: "₹4,872", landUse: "Agricultural", risk: "Moderate" },
  { date: "2024-10-22", location: "Mysore North", rate: "₹3,650", landUse: "Residential", risk: "Low" },
  { date: "2024-09-10", location: "Hubli East", rate: "₹2,980", landUse: "Commercial", risk: "High" },
  { date: "2024-08-05", location: "Tumkur Central", rate: "₹5,200", landUse: "Agricultural", risk: "Low" },
  { date: "2024-07-18", location: "Mandya West", rate: "₹4,100", landUse: "Agricultural", risk: "Moderate" },
];

const riskBadge = (risk: string) => {
  const cls = risk === "High" ? "bg-destructive/10 text-destructive" : risk === "Moderate" ? "badge-amber" : "badge-emerald";
  return <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${cls}`}>{risk}</span>;
};

export function ReportsPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);

  const handleExport = (type: string) => {
    setLoading(type);
    setTimeout(() => {
      setLoading(null);
      toast({
        title: `${type} exported successfully`,
        description: `Your ${type.toLowerCase()} file is ready for download.`,
      });
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Summary */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4">Evaluation Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { label: "Final Rate", value: "₹4,872/sq.ft" },
            { label: "Confidence", value: "78%" },
            { label: "Risk Level", value: "Moderate" },
            { label: "Best Use", value: "Agricultural" },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="text-lg font-bold text-foreground mt-1">{item.value}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Export Actions */}
      <div className="flex gap-3">
        <Button onClick={() => handleExport("PDF")} disabled={loading === "PDF"} className="gap-2">
          {loading === "PDF" ? <Skeleton className="w-4 h-4 rounded" /> : <Download className="w-4 h-4" />}
          Download PDF
        </Button>
        <Button variant="secondary" onClick={() => handleExport("CSV")} disabled={loading === "CSV"} className="gap-2">
          {loading === "CSV" ? <Skeleton className="w-4 h-4 rounded" /> : <FileSpreadsheet className="w-4 h-4" />}
          Export CSV
        </Button>
      </div>

      {/* Previous Evaluations Table */}
      <div className="glass-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Rate</TableHead>
              <TableHead>Land Use</TableHead>
              <TableHead>Risk</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {evaluations.map((ev) => (
              <TableRow key={ev.date + ev.location}>
                <TableCell className="text-sm">{ev.date}</TableCell>
                <TableCell className="text-sm font-medium">{ev.location}</TableCell>
                <TableCell className="text-sm">{ev.rate}</TableCell>
                <TableCell><span className="badge-blue">{ev.landUse}</span></TableCell>
                <TableCell>{riskBadge(ev.risk)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-3 rounded-2xl p-4 bg-accent/10 border border-accent/20">
        <AlertTriangle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-foreground">Academic Use Notice</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            This evaluation is generated for academic and research purposes only. It should not be used as the sole basis for financial or legal decisions regarding land transactions.
          </p>
        </div>
      </div>
    </div>
  );
}
