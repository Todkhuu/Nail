import { ServiceType } from "@/app/utils/types";
import { Button } from "@/components/ui/button";
import axios from "axios";

type Props = {
  service: ServiceType;
  getService: () => void;
};

export const EditFeature = ({ service, getService }: Props) => {
  const editFeature = async (service: ServiceType, featureValue?: boolean) => {
    try {
      await axios.put("/api/services", {
        _id: service._id,
        feature: featureValue !== undefined ? featureValue : !service.feature,
      });
      getService();
    } catch (error) {
      console.error("Feature update error:", error);
    }
  };

  return (
    <Button
      size="sm"
      variant="outline"
      className={`flex-1 ${
        service?.feature
          ? "border-yellow-200 text-yellow-600 hover:bg-yellow-50"
          : "border-gray-200 text-gray-600 hover:bg-gray-50"
      }`}
      onClick={() => editFeature(service, !service.feature)}
    >
      {service?.feature ? "Unfeature" : "Feature"}
    </Button>
  );
};
