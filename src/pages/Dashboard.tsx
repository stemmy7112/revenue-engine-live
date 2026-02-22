import { motion } from "framer-motion";
import { Zap, TrendingUp, Clock, BarChart3, ArrowUpRight, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { mockOpportunities, type Opportunity } from "@/lib/opportunities";

const ScoreBadge = ({ score }: { score: number }) => {
  const color =
    score >= 50 ? "text-primary border-glow/30 bg-glow/10" :
    score >= 30 ? "text-yellow-400 border-yellow-400/30 bg-yellow-400/10" :
    "text-muted-foreground border-border bg-muted";

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-bold ${color}`}>
      <TrendingUp className="w-3 h-3" />
      {score}
    </span>
  );
};

const MeterBar = ({ value, max = 10, label }: { value: number; max?: number; label: string }) => (
  <div className="flex items-center gap-2 text-xs">
    <span className="text-muted-foreground w-20 shrink-0">{label}</span>
    <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-primary"
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
    <span className="text-muted-foreground w-4 text-right">{value}</span>
  </div>
);

const OpportunityCard = ({ opp, index }: { opp: Opportunity; index: number }) => (
  <motion.div
    className="p-5 rounded-xl bg-card border border-border hover:border-glow/20 transition-all group"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.05 }}
  >
    <div className="flex items-start justify-between mb-3">
      <div>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-primary">{opp.category}</span>
        <h3 className="text-base font-semibold mt-0.5 group-hover:text-primary transition-colors">{opp.title}</h3>
      </div>
      <ScoreBadge score={opp.score} />
    </div>
    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{opp.description}</p>
    <div className="space-y-2 mb-4">
      <MeterBar value={opp.automationLevel} label="Automation" />
      <MeterBar value={opp.speedToCash} label="Speed" />
      <MeterBar value={opp.competitionScore} label="Competition" />
    </div>
    <div className="flex items-center justify-between pt-3 border-t border-border">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <Clock className="w-3 h-3" />
        {opp.timeToCash}
      </div>
      <button className="text-xs font-medium text-primary flex items-center gap-1 hover:underline">
        View Details <ArrowUpRight className="w-3 h-3" />
      </button>
    </div>
  </motion.div>
);

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Topbar */}
      <header className="border-b border-border glass fixed top-0 left-0 right-0 z-50">
        <div className="container max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-bold">
            <div className="w-7 h-7 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            AutoIncome
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
            <div className="px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium flex items-center gap-1.5">
              <Shield className="w-3 h-3" />
              Demo Mode
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-16 container max-w-6xl mx-auto px-6">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Opportunity Dashboard</h1>
          <p className="text-muted-foreground">
            Ranked by our algorithm: <code className="text-xs bg-muted px-2 py-0.5 rounded font-mono">
              Score = (Automation × 0.4) + (Speed × 0.4) − (Competition × 0.2)
            </code>
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: BarChart3, label: "Total Opportunities", value: mockOpportunities.length },
            { icon: TrendingUp, label: "Avg Score", value: (mockOpportunities.reduce((a, o) => a + o.score, 0) / mockOpportunities.length).toFixed(1) },
            { icon: Zap, label: "High Automation", value: mockOpportunities.filter((o) => o.automationLevel >= 7).length },
            { icon: Clock, label: "Fast Cash (<48h)", value: mockOpportunities.filter((o) => o.speedToCash >= 8).length },
          ].map((stat) => (
            <div key={stat.label} className="p-4 rounded-xl bg-card border border-border">
              <stat.icon className="w-4 h-4 text-primary mb-2" />
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Opportunities grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {mockOpportunities.map((opp, i) => (
            <OpportunityCard key={opp.id} opp={opp} index={i} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
