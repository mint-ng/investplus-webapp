import { AxiosError } from "axios";

export const getErrorMessage = (errObj: unknown): string => {
  const error = errObj as AxiosError<{ message?: string; error?: string }>;
  return (
    error.response?.data?.message ||
    error.response?.data?.error ||
    error.message ||
    "Something went Wrong. Please try again"
  );
};
