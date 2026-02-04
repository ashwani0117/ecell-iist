import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card className="p-12 text-center space-y-6 shadow-xl border-slate-100">
          <div className="mx-auto w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 rotate-3 transform shadow-sm">
            <Lock className="w-10 h-10 text-slate-400" />
          </div>
          
          <div className="space-y-3">
            <h1 className="text-2xl font-bold text-gray-900">Portal Access Only</h1>
            <p className="text-gray-500 leading-relaxed">
              This is a private certificate verification portal. <br/>
              Please use the unique secure link provided to you to access your certificate.
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
