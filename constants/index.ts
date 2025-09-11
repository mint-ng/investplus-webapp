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