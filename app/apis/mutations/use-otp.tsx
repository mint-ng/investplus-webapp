import { useMutation } from "@tanstack/react-query";
import routes from "@/app/config/routes";
import InvestmentPulse from "@/app/axios/services/InvestmentPulse";
import { toast } from "react-toastify";
import { OtpPayload } from "@/constants";
import { getErrorMessage } from "@/app/utils/helpers";

export default function GetOtp(options?: { onSuccess?: (sessionId: string) => void }){
    return useMutation({
		mutationFn: async function ({ bvn, phoneNumber }: OtpPayload) {
			const response = await InvestmentPulse.post(routes.getOtp, { bvn, phoneNumber });
			return response.data;
		},
		mutationKey: ["get-otp"],
		 onSuccess: (data) => {
      toast.success(data?.message ?? "OTP sent successfully!");

      const sessionId = data?.data?.sessionId;
      if (sessionId) {
        options?.onSuccess?.(sessionId);
      }
    },
		onError: (error) => {
			toast.error(getErrorMessage(error));
		},
	});
}

