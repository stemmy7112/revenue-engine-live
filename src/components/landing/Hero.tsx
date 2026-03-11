import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-[82vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-pattern opacity-40" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-52 h-52 sm:w-96 sm:h-96 bg-glow/5 rounded-full blur-[100px] sm:blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-52 h-52 sm:w-96 sm:h-96 bg-glow-secondary/5 rounded-full blur-[100px] sm:blur-[120px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      <div className="relative z-10 container max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-glow/20 bg-glow/5 text-primary text-sm font-medium mb-8">
            <Zap className="w-3.5 h-3.5" />
            AI-Powered Income Discovery
          </div>
        </motion.div>

        <motion.h1
          className="text-3xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Find The Fastest Way To{" "}
          <span className="text-gradient">Make Money Online</span>
          <br />
          <span className="text-muted-foreground text-2xl sm:text-4xl lg:text-5xl font-semibold">
            Ranked By Speed To Cash
          </span>
        </motion.h1>

        <motion.p
          className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          Our algorithm scores and ranks income opportunities by automation level,
          speed to first dollar, and competition — so you focus only on what works.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <Link
            to="/pricing"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg bg-gradient-primary text-primary-foreground font-semibold text-base sm:text-lg shadow-glow hover:shadow-glow-lg transition-all duration-300 hover:scale-105"
          >
            Unlock Opportunities
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-lg border border-border text-secondary-foreground font-medium text-base sm:text-lg hover:bg-secondary transition-colors"
          >
            View Demo
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 sm:gap-16 mt-12 sm:mt-16 pt-12 sm:pt-16 border-t border-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          {[
            { value: "2,400+", label: "Opportunities Ranked" },
            { value: "$12M+", label: "Revenue Generated" },
            { value: "< 48h", label: "Avg Time To First Dollar" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-gradient">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
