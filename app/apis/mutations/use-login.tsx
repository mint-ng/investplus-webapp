import { loginSession } from "@/app/redux/features/user-slice";
import { useMutation } from "@tanstack/react-query";
import routes from "@/app/config/routes";
import { useDispatch } from "react-redux";
import InvestmentPulse from "@/app/axios/services/InvestmentPulse";
import { toast } from "react-toastify";
import { LoginPayload } from "@/constants";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/app/utils/helpers";

export default function Login() {
	const dispatch = useDispatch();
	const router = useRouter();

	return useMutation({
		mutationFn: async function ({ email, password }: LoginPayload) {
			const response = await InvestmentPulse.post(routes.login, { email, password });
			return response.data;
		},
		mutationKey: ["login"],
		onSuccess: (data) => {
			dispatch(
				loginSession({
					name: data.data?.name,         
          			accessToken: data.data?.accessToken,
				})
			);
			router.push("/Dashboard")
		},
		onError: (error) => {
			toast.error(getErrorMessage(error));
		},
	});
}
