import { useMutation } from "@tanstack/react-query";
import InvestmentPulse from "@/app/axios/services/InvestmentPulse";
import routes from "@/app/config/routes";

export type CheckFundingPayload = {
  reference: string;
};

export const checkFunding = async ({ reference }: CheckFundingPayload) => {
  const response = await InvestmentPulse.get(
    `${routes.paymentStatus}?reference=${reference}`
  );
  return response.data;
};

export const useCheckFunding = () =>
  useMutation<any, any, CheckFundingPayload>({
    mutationFn: checkFunding,
  });
