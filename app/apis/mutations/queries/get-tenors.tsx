import routes from "@/app/config/routes";
import InvestmentPulse from "@/app/axios/services/InvestmentPulse";
import { getErrorMessage } from "@/app/utils/helpers";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function useTenors() {
  return useQuery({
    queryKey: ["get_tenors"],
    queryFn: async () => {
      try {
        const { status, data } = await InvestmentPulse.get(routes.getTenors);

        if (status !== 200) {
          throw new Error("Failed to fetch tenors");
        }

        return data.data; // ✅ Return your API response
      } catch (err: any) {
        toast.error(getErrorMessage(err));
        throw err; // ✅ Rethrow for React Query error handling
      }
    },
    retry: false,
  });
}
