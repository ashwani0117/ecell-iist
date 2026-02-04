import { useState, useEffect } from "react";
import staticData from "../data.json";

export interface CertificateData {
  id: string;
  name: string;
  file: string;
}

// Simulating an async hook to maintain consistent patterns
// even though data is local. This allows for loading states.
export function useCertificate(id: string) {
  const [data, setData] = useState<CertificateData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate network delay for a smoother UX feeling
    const timer = setTimeout(() => {
      try {
        const found = staticData.find((item) => item.id === id);
        if (found) {
          setData(found);
          setError(null);
        } else {
          setData(null);
          // We don't throw here, just set data to null to indicate "not found" logic
          // But technically it's a "success" in terms of the query finishing
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setIsLoading(false);
      }
    }, 800); // 800ms delay for "verifying" animation effect

    return () => clearTimeout(timer);
  }, [id]);

  return { data, isLoading, error };
}
