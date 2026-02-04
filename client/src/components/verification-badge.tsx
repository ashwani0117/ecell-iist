import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function VerificationBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-green-700 border border-green-200 shadow-sm"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
      >
        <CheckCircle2 className="w-5 h-5 fill-green-100" />
      </motion.div>
      <span className="text-sm font-semibold tracking-wide uppercase">Certificate Verified</span>
    </motion.div>
  );
}
