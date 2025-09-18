import { useMutation } from "@tanstack/react-query";
import routes from "@/app/config/routes";
import InvestmentPulse from "@/app/axios/services/InvestmentPulse";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/app/utils/helpers";
import { useRouter } from "next/navigation";

type CompleteRegistrationPayload = {
  sessionId: string;
  password: string;
  code: string | null;
};

export function useCompleteRegistration() {
    const router = useRouter();
  return useMutation({
     mutationFn: async ({ sessionId, password, code }: CompleteRegistrationPayload) => {
      const response = await InvestmentPulse.put(
        routes.completeRegistration(sessionId),
        {}, // body (empty)
        { params: { sessionId, password, code } }
      );
      return response.data;
    },
    mutationKey: ["complete-registration"],
    onSuccess: (data) => {
        toast.success(data?.message ?? "Registration completed!");
        router.push("/");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}
export function usePasswordReset() {
    const router = useRouter();
  return useMutation({
     mutationFn: async ({ sessionId, password, code }: CompleteRegistrationPayload) => {
      const response = await InvestmentPulse.put(
        routes.resetPassword,
        {}, // body (empty)
        { params: { sessionId, password, code } }
      );
      return response.data;
    },
    mutationKey: ["reset-password"],
    onSuccess: (data) => {
        toast.success(data?.message ?? "Password Reset Successful!");
        router.push("/");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}