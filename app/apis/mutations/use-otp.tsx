import { useMutation } from "@tanstack/react-query";
import routes from "@/app/config/routes";
import InvestmentPulse from "@/app/axios/services/InvestmentPulse";
import { toast } from "react-toastify";
import { OtpPayload } from "@/constants";
import { getErrorMessage } from "@/app/utils/helpers";

export default function GetOtp(options?: { 
  onSuccess?: (sessionId: string) => void,
  onConflict?: (message: string) => void // <-- Added handler for 409 errors
}) {
  return useMutation({
    mutationFn: async function ({ bvn, phoneNumber }: OtpPayload) {
      try {
        const response = await InvestmentPulse.post(routes.getOtp, { bvn, phoneNumber });
        return response.data;
      } catch (error: any) {
        // ✅ Handle specific 409 Conflict response
        if (error.response?.status === 409) {
          const message =
            error.response?.data?.message ||
            "You already have a Mintyn account. Please sign in.";
          options?.onConflict?.(message);
          return Promise.reject(error); // stop normal flow
        }

        throw error;
      }
    },

    mutationKey: ["get-otp"],

    onSuccess: (data) => {
      toast.success(data?.message ?? "OTP sent successfully!");
      const sessionId = data?.data?.sessionId;
      if (sessionId) {
        options?.onSuccess?.(sessionId);
      }
    },

    onError: (error: any) => {
      // Don't toast 409 — handled by modal instead
      if (error?.response?.status !== 409) {
        toast.error(getErrorMessage(error));
      }
    },
  });
}
