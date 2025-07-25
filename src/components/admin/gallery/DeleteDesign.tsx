import { ServiceType } from "@/app/utils/types";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import { useService } from "@/app/_context/ServiceContext";

export const DeleteDesign = ({ service }: { service: ServiceType }) => {
  const { getService } = useService();

  const deleteDesign = async () => {
    if (!service._id) {
      toast.error("Service ID not found");
      return;
    }

    if (!confirm("Are you sure you want to delete this design?")) {
      return;
    }

    try {
      await axios.delete("/api/services", {
        data: { id: service._id },
      });

      toast.success("Design deleted successfully");
      getService();
    } catch (error) {
      console.error("Error deleting design:", error);
      toast.error("Failed to delete design");
    }
  };

  return (
    <Button
      size="sm"
      className="border-red-200 text-red-600 hover:bg-red-50"
      onClick={deleteDesign}
    >
      <Trash2 className="h-3 w-3" />
    </Button>
  );
};
