import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md mx-4 shadow-xl border-slate-100">
        <CardContent className="pt-10 pb-10 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle className="h-8 w-8 text-orange-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">404 Page Not Found</h1>
          <p className="text-gray-500 mb-6">
             The page you are looking for does not exist or has been moved.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
