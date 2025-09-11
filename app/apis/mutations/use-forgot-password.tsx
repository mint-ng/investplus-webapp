import { useMutation } from "@tanstack/react-query";
import routes from "@/app/config/routes";
import InvestmentPulse from "@/app/axios/services/InvestmentPulse";
import { toast } from "react-toastify";
import { getErrorMessage } from "@/app/utils/helpers";

type passwordProp = {
    email:string
}

export function ForgotPassword() {
  return useMutation({
    mutationFn: async ({ email }: passwordProp) => {
      const response = await InvestmentPulse.put(
        routes.forgotPassword,
        {}, 
        { params: { email } }
      );
      return response.data;
    },
    mutationKey: ["forgot-password"],
    onSuccess: (data) => {
      toast.success(data?.message ?? "Link sent!");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}