import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookie from "js-cookie";
import { cookieOptions } from "@/constants";

import { INVESTMENT_USER, INVESTMENT_USER_TOKEN } from "@/constants";

export interface userType {
  userName: null | string;
  isAuth: string;
}
interface LoginPayload {
  name: string;
  accessToken: string;
  callback?: () => void;
}
const initialState: userType = {
  userName: Cookie.get(INVESTMENT_USER) || null,
  isAuth: Cookie.get(INVESTMENT_USER_TOKEN) || "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginSession: (state: userType, action: PayloadAction<LoginPayload>) => {
            const { name, accessToken } = action.payload;
            Cookie.set(INVESTMENT_USER, name, cookieOptions);
            Cookie.set(INVESTMENT_USER_TOKEN, accessToken, cookieOptions);

            state.userName = name;
            state.isAuth = accessToken;

            action.payload.callback?.();
        },

        logoutSession: (state: userType) => {

            Cookie.remove(INVESTMENT_USER, cookieOptions);
            Cookie.remove(INVESTMENT_USER_TOKEN);

            state.userName = null;
            state.isAuth = "";
        },
    }
});

export default userSlice.reducer;
export const { loginSession, logoutSession } = userSlice.actions