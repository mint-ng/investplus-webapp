import routes from "@/app/config/routes";
import InvestmentPulse from "@/app/axios/services/InvestmentPulse";
import { getErrorMessage } from "@/app/utils/helpers";
import { useQuery } from "@tanstack/react-query";
import { InvestmentRecord } from "@/constants";
import { toast } from "react-toastify";

export default function Investments(size: number = 10, page: number = 0) {
  return useQuery<
    {
      message: string;
      data: {
        totalRecords: number;
        totalPages: number;
        totalAmount: number;
        totalReturns: number;
        records: InvestmentRecord[];
      };
    },
    Error
  >({
    queryKey: ["get_investments", size, page],
    queryFn: async () => {
      try {
        const { status, data } = await InvestmentPulse.get(
          routes.getInvestments,
          { params: { page, size } }
        );

        if (status !== 200) {
          throw new Error("Failed to fetch investments");
        }

        return data; // ✅ Always return something
      } catch (err: any) {
        toast.error(getErrorMessage(err));
        throw err; // ✅ rethrow so React Query marks it as error
      }
    },
    retry: false, // ✅ avoid multiple retries spamming
  });
}
