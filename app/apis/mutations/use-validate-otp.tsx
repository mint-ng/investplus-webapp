import { useMutation } from "@tanstack/react-query";
import routes from "@/app/config/routes";
import InvestmentPulse from "@/app/axios/services/InvestmentPulse";
import { toast } from "react-toastify";
import { ValidateOtpPayload } from "@/constants";
import { getErrorMessage } from "@/app/utils/helpers";

export default function ValidateOtp(options?: { onSuccess?: (data: any) => void }){
    return useMutation({
		mutationFn: async function ({ otp, sessionId }: ValidateOtpPayload) {
			const response = await InvestmentPulse.put(routes.validateOtp(sessionId), { otp, sessionId });
			return response.data;
		},
		mutationKey: ["validate-otp"],
		 onSuccess: (data) => {
      toast.success(data?.message ?? "OTP validated successfully!");
       options?.onSuccess?.(data);
    },
		onError: (error) => {
			toast.error(getErrorMessage(error));
		},
	});
}

