import axios from "axios";
// import { logoutSession } from "@/app/redux/features/user-slice";
// import { store } from "@/app/redux/store";
// import { toast } from "react-toastify";
import Cookie from "js-cookie";
import apiBaseURL, {clientKey} from "@/app/config/apiBaseUrl";
import {  INVESTMENT_USER_TOKEN } from "@/constants";

const CancelToken = axios.CancelToken;
let requestSignal;

const InvestmentPulse = axios.create({ baseURL: apiBaseURL });
const accessToken = Cookie.get(INVESTMENT_USER_TOKEN );

InvestmentPulse.interceptors.request.use(
	(config) => {
		const accessToken = Cookie.get(INVESTMENT_USER_TOKEN);
		config.headers["x-request-client-key"] = clientKey;
		  if (accessToken) {
      config.headers["access-token"] = accessToken;
    }
		return config;
	},
	(error) => {
		Promise.reject(error);
	}
);

export default InvestmentPulse