import { useRoute } from "wouter";
import { useCertificate } from "@/hooks/use-certificate";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Download, FileText, ShieldCheck, AlertCircle, Info } from "lucide-react";
import { VerificationBadge } from "@/components/verification-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import logoPng from "@/assets/logo.png";

export default function DownloadPage() {
  const [, params] = useRoute("/cert/:id");
  const id = params?.id || "";
  const { data, isLoading } = useCertificate(id);

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 sm:py-14 bg-background">
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
      <div className="min-h-screen flex items-center justify-center px-4 py-10 sm:py-14 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-sm sm:max-w-md"
        >
          <Card className="p-8 border-border shadow-lg shadow-red-500/10 bg-secondary/80 text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-red-400" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">Invalid Link</h1>
              <p className="text-muted-foreground">
                The certificate link you are trying to access is invalid, expired, or does not exist.
              </p>
            </div>

            <div className="text-xs text-muted-foreground uppercase tracking-widest pt-4 border-t border-border">
              Security Alert System
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Success State
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 sm:py-14 relative overflow-hidden bg-background">
      
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
          <p className="text-muted-foreground text-xs sm:text-sm">
            Securely download your official event certificate below.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-sm sm:max-w-lg relative z-10"
      >
        <Card className="overflow-hidden border-border/50 shadow-2xl shadow-black/30 bg-secondary/85 backdrop-blur">
          {/* Header Section */}
          <div className="p-6 sm:p-8 pb-5 sm:pb-6 flex flex-col items-center text-center space-y-5 sm:space-y-6">
            <VerificationBadge />
            
            <div className="space-y-2">
              <h2 className="text-lg sm:text-xl font-bold text-foreground">
                Welcome to the Official Certificate Distribution Portal
              </h2>
              <div className="space-y-1">
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                  Authorized Recipient
                </h3>
                <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight">
                  {data.name}
                </h1>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-muted-foreground max-w-sm leading-relaxed">
              This portal is designed to provide participants with secure and seamless access to their event certificates. 
              Each certificate is digitally verified and issued by the Entrepreneurship Cell.
            </p>
          </div>

          <Separator className="opacity-50" />

          {/* Details Section */}
          <div className="p-6 sm:p-8 pt-5 sm:pt-6 space-y-6 sm:space-y-8">
            <div className="bg-background/60 rounded-xl p-5 sm:p-6 border border-border flex items-start gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 bg-secondary rounded-lg shadow-sm border border-border">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">Certificate of Completion</h4>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Secure PDF Format • Signed & Verified
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <Button 
                className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold shadow-lg shadow-primary/25 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 active:translate-y-0 active:shadow-md"
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
              
              <div className="p-3 sm:p-4 bg-primary/10 rounded-lg border border-primary/20 space-y-2">
                <div className="flex items-center gap-2 text-primary font-semibold text-xs sm:text-sm">
                  <ShieldCheck className="w-4 h-4" />
                  Security Notice
                </div>
                <p className="text-[11px] sm:text-xs text-primary/80 leading-relaxed">
                  Your certificate is accessible only through your unique private link. 
                  For privacy and authenticity reasons, links are non-transferable. 
                  Please do not share your access link with others.
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Info className="w-3.5 h-3.5" />
              <span>If you face any issues, contact the organizing team.</span>
            </div>
          </div>
          
          {/* Footer ID Display */}
           <div className="bg-background/60 p-3 sm:p-4 text-center border-t border-border">
             <p className="text-[11px] sm:text-xs font-mono text-muted-foreground">
               ID: {data.id}
             </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
