import Cookies from "js-cookie";

export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W_]).{8,}$/;
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const BVN_REGEX = /^\d{11}$/;

export const INVESTMENT_USER = "INVESTMENT_USER"
export const INVESTMENT_USER_TOKEN = "INVESTMENT_USER_TOKEN"

export const cookieOptions: {
  sameSite: 'strict' | 'lax' | 'none';
  secure: boolean;
} = {
  sameSite: 'strict',
  secure: true,
};

export type LoginType = {
  name?: string;
  accessToken?: string;
};

export interface LoginPayload {
  email: string;
  password: string;
}
export interface OtpPayload {
  phoneNumber: string;
  bvn: string;
}
export interface ValidateOtpPayload {
  sessionId: string;
  otp: string;
}
export interface StepsPayload {
  sessionId: string;
  firstName: string;
  lastName: string;
  email: string;
}

export type ChildRouteObject = {
  isHidden?: boolean;
  title: string;
  path: string;
};

export type ParentRouteObject = {
  icon: React.ElementType;
  title: string;
  path: string;
  isHidden?: boolean;
  children?: ChildRouteObject[];
};

// types/investment.ts
export interface InvestmentRecord {
  id: number;
  investorName: string;
  phoneNumber: string;
  email: string;
  durationCategory: string;
  referralCode: string;
  bvn: string;
  amountInvested: number;
  durationInMonths: number;
  interestRate: number;
  maturityDate: string;
  investmentStatus: string;
  dateCreated: string;
  expectedReturn: number;
  expectedProfit: number;
  daysLeftToMaturity: number;
}

export interface InvestmentResponse {
  data: {
    totalRecords: number;
    totalPages: number;
    totalAmount: number;
    totalReturns: number;
    records: InvestmentRecord[];
  };
}




export const profileDropdownLinks: { title: string; path: string }[] = [
  {
    title: "Logout",
    path: "",
  },
   {
    title: "Change Password",
    path: "/forgot-password",
  },
];