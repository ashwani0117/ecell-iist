import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { Card } from "@/components/ui/card";
import logoPng from "@/assets/logo.png";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50/50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col items-center text-center space-y-4"
      >
        <img src={logoPng} alt="E-Cell Logo" className="w-24 h-24 object-contain" />
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">Entrepreneurship Cell – Certificate Portal</h1>
          <p className="text-blue-600 font-medium tracking-wide text-sm uppercase">
            Empowering innovation. Recognizing participation.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card className="p-12 text-center space-y-6 shadow-xl border-slate-100 bg-white">
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
