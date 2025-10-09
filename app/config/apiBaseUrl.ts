// const apiBaseURL = "https://api-sandbox.mintfintech.com/savings-service";
const apiBaseURL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/savings-service`;
export const clientKey = process.env.NEXT_PUBLIC_CLIENT_KEY;

export default apiBaseURL;
