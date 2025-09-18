// src/app/apis/mutations/useCreateInvestment.ts
import { useMutation } from "@tanstack/react-query";
import InvestmentPulse from "@/app/axios/services/InvestmentPulse";
import routes from "@/app/config/routes";

export type CreateInvestmentPayload = {
  durationId: number;
  investmentAmount: number;
  durationInMonths: number;
  referralCode: string;
};

async function createInvestment(payload: CreateInvestmentPayload) {
  const response = await InvestmentPulse.post(routes.getInvestments, payload);
  return response.data;
}

export function useCreateInvestment() {
  return useMutation({
    mutationFn: createInvestment,
  });
}
