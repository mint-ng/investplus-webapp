import axios from "axios";
// import { logoutSession } from "@/app/redux/features/user-slice";
// import { store } from "@/app/redux/store";
// import { toast } from "react-toastify";
import Cookie from "js-cookie";
import apiBaseURL, {clientKey} from "@/app/config/apiBaseUrl";
// import { INVESTMENT_USER, INVESTMENT_USER_TOKEN } from "@/constants";

const CancelToken = axios.CancelToken;
let requestSignal;

const InvestmentPulse = axios.create({ baseURL: apiBaseURL });
// const user = Cookie.get(INVESTMENT_USER);

InvestmentPulse.interceptors.request.use(
	(config) => {
		config.headers["x-request-client-key"] = clientKey;
		// requestSignal = CancelToken.source();
		// config.cancelToken = requestSignal.token;
		return config;
	},
	(error) => {
		Promise.reject(error);
	}
);

export default InvestmentPulse