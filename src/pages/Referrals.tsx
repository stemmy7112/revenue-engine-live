import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Zap, Users, Copy, Check, Link2, Share2, LogOut, ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

interface Profile {
  id: string;
  referral_code: string | null;
}

interface Referral {
  id: string;
  referred_email: string | null;
  converted: boolean | null;
  created_at: string;
}

const Referrals = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate("/auth");
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      const { data: p } = await supabase
        .from("profiles")
        .select("id, referral_code")
        .eq("user_id", user.id)
        .single();
      setProfile(p as Profile | null);

      if (p) {
        const { data: refs } = await supabase
          .from("referrals")
          .select("id, referred_email, converted, created_at")
          .eq("referrer_id", p.id)
          .order("created_at", { ascending: false });
        setReferrals((refs as Referral[]) || []);
      }
      setLoadingData(false);
    };
    fetch();
  }, [user]);

  const referralLink = profile?.referral_code
    ? `${window.location.origin}/auth?ref=${profile.referral_code}`
    : "";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const totalReferred = referrals.length;
  const totalConverted = referrals.filter((r) => r.converted).length;

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg">
            <Zap className="w-5 h-5 text-primary" />
            AutoIncome
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" /> Dashboard
            </button>
            <button
              onClick={signOut}
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1"
            >
              <LogOut className="w-4 h-4" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="container max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Referral Program</h1>
          <p className="text-muted-foreground">
            Share your link, earn rewards when friends subscribe.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <motion.div
            className="rounded-xl bg-card border border-border p-6 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Users className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-3xl font-bold">{totalReferred}</p>
            <p className="text-sm text-muted-foreground">Referred</p>
          </motion.div>
          <motion.div
            className="rounded-xl bg-card border border-border p-6 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <Share2 className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-3xl font-bold">{totalConverted}</p>
            <p className="text-sm text-muted-foreground">Converted</p>
          </motion.div>
        </div>

        {/* Share Link */}
        <motion.div
          className="rounded-xl bg-card border border-primary/20 p-6 mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Link2 className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-lg">Your Referral Link</h2>
          </div>
          <div className="flex items-center gap-2">
            <input
              readOnly
              value={loadingData ? "Loading..." : referralLink}
              className="flex-1 px-4 py-2.5 rounded-lg bg-muted border border-border text-sm text-foreground font-mono truncate"
            />
            <button
              onClick={handleCopy}
              disabled={!referralLink}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-gradient-primary text-primary-foreground font-semibold text-sm shadow-glow hover:shadow-glow-lg transition-all hover:scale-[1.02] disabled:opacity-50"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </motion.div>

        {/* Referral History */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h2 className="font-semibold text-lg mb-4">Referral History</h2>
          {loadingData ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-14 rounded-xl bg-card border border-border animate-pulse" />
              ))}
            </div>
          ) : referrals.length === 0 ? (
            <div className="text-center py-12 rounded-xl bg-card border border-border text-muted-foreground">
              <Users className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p>No referrals yet. Share your link to get started!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {referrals.map((ref) => (
                <div
                  key={ref.id}
                  className="rounded-xl bg-card border border-border p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {ref.referred_email || "Pending signup"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(ref.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full border ${
                      ref.converted
                        ? "bg-primary/10 text-primary border-primary/20"
                        : "bg-muted text-muted-foreground border-border"
                    }`}
                  >
                    {ref.converted ? "Converted" : "Pending"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Referrals;
