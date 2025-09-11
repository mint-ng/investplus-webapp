import { useMutation } from "@tanstack/react-query";
import routes from "@/app/config/routes";
import InvestmentPulse from "@/app/axios/services/InvestmentPulse";
import { toast } from "react-toastify";
import { ValidateOtpPayload, StepsPayload } from "@/constants";
import { getErrorMessage } from "@/app/utils/helpers";

export default function ValidateOtp(options?: { onSuccess?: (data: any) => void }){
    return useMutation({
		mutationFn: async function ({ otp, sessionId }: ValidateOtpPayload) {
			const response = await InvestmentPulse.put(
    routes.validateOtp(sessionId),
    {}, // no body
    { params: { otp, sessionId } }
  );
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

export function ResendOtp() {
  return useMutation({
    mutationFn: async (sessionId: string) => {
      const response = await InvestmentPulse.put(
        routes.resendOtp(sessionId),
        {}, // body (empty)
        { params: { sessionId } }
      );
      return response.data;
    },
    mutationKey: ["resend-otp"],
    onSuccess: (data) => {
      toast.success(data?.message ?? "OTP successfully sent!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}


export function UpdateAccount() {
  return useMutation({
    mutationFn: async ({ sessionId, firstName, lastName, email }: StepsPayload) => {
      const response = await InvestmentPulse.put(
        routes.updateAccount(sessionId),
        {}, 
        { params: { sessionId, firstName, lastName, email } }
      );
      return response.data;
    },
    mutationKey: ["update-account"],
    onSuccess: (data) => {
      toast.success(data?.message ?? "Account updated successfully!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}


