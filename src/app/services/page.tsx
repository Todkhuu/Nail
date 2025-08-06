import ClientServices from "@/components/services/ClientServices";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

export default function ServicesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen w-screen bg-white">
          <Loader2 className="w-10 h-10 text-rose-500 animate-spin" />
        </div>
      }
    >
      <ClientServices />
    </Suspense>
  );
}
