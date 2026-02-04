import { useRoute } from "wouter";
import { useCertificate } from "@/hooks/use-certificate";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Download, FileText, ShieldCheck, AlertCircle } from "lucide-react";
import { VerificationBadge } from "@/components/verification-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function DownloadPage() {
  const [, params] = useRoute("/cert/:id");
  const id = params?.id || "";
  const { data, isLoading } = useCertificate(id);

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
            <Loader2 className="w-12 h-12 text-primary animate-spin relative z-10" />
          </div>
          <p className="text-muted-foreground font-medium animate-pulse">Verifying Certificate ID...</p>
        </motion.div>
      </div>
    );
  }

  // Not Found / Invalid State
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-red-50/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="p-8 border-red-100 shadow-lg shadow-red-100/50 bg-white text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">Invalid Link</h1>
              <p className="text-gray-500">
                The certificate link you are trying to access is invalid, expired, or does not exist.
              </p>
            </div>

            <div className="text-xs text-gray-400 uppercase tracking-widest pt-4 border-t border-gray-100">
              Security Alert System
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Success State
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-blue-50/80 to-transparent -z-10" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg relative z-10"
      >
        <Card className="overflow-hidden border-border/50 shadow-2xl shadow-blue-900/5 bg-white">
          {/* Header Section */}
          <div className="p-8 pb-6 flex flex-col items-center text-center space-y-6">
            <VerificationBadge />
            
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                Authorized Recipient
              </h3>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                {data.name}
              </h1>
            </div>
          </div>

          <Separator className="opacity-50" />

          {/* Details Section */}
          <div className="p-8 pt-6 space-y-8">
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-100 flex items-start gap-4">
              <div className="p-3 bg-white rounded-lg shadow-sm border border-slate-100">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Certificate of Completion</h4>
                <p className="text-sm text-gray-500 mt-1">
                  Secure PDF Format • Signed & Verified
                </p>
              </div>
            </div>

            <Button 
              className="w-full h-14 text-lg font-semibold shadow-lg shadow-primary/25 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 active:translate-y-0 active:shadow-md"
              size="lg"
              onClick={() => {
                const link = document.createElement('a');
                link.href = `/certificates/${data.file}`;
                link.download = data.file;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <Download className="mr-2 w-5 h-5" />
              Download Certificate
            </Button>
            
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Secure, encrypted download link</span>
            </div>
          </div>
          
          {/* Footer ID Display */}
          <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
             <p className="text-xs font-mono text-slate-400">
               ID: {data.id}
             </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
