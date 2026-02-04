import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { Card } from "@/components/ui/card";
import logoPng from "@/assets/logo.png";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 sm:py-14 bg-background">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 sm:mb-8 flex flex-col items-center text-center space-y-3 sm:space-y-4"
      >
        <img
          src={logoPng}
          alt="E-Cell Logo"
          className="w-20 h-20 sm:w-28 sm:h-28 object-contain drop-shadow-[0_0_20px_rgba(99,102,241,0.45)]"
        />
        <div className="space-y-1">
          <h1 className="text-lg sm:text-2xl font-bold text-foreground leading-snug">
            Entrepreneurship Cell – Certificate Portal
          </h1>
          <p className="text-primary font-medium tracking-wide text-xs sm:text-sm uppercase">
            Empowering innovation. Recognizing participation.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm sm:max-w-md"
      >
        <Card className="p-7 sm:p-12 text-center space-y-5 sm:space-y-6 shadow-xl border-border bg-secondary/80 backdrop-blur">
          <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-background/60 border border-border rounded-2xl flex items-center justify-center mb-2 sm:mb-4 rotate-3 transform shadow-sm">
            <Lock className="w-9 h-9 sm:w-10 sm:h-10 text-primary" />
          </div>
          
          <div className="space-y-3">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">Portal Access Only</h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              This is a private certificate verification portal. <br/>
              Please use the unique secure link provided to you to access your certificate.
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
