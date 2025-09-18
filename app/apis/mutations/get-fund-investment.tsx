import InvestmentPulse from "@/app/axios/services/InvestmentPulse";
import routes from "@/app/config/routes";

export type FundInvestmentPayload = {
  investmentCode: number;
};

export const fundInvestment = async (payload: FundInvestmentPayload) => {
  const response = await InvestmentPulse.post(routes.fundInvestment, payload);
  return response.data;
};
