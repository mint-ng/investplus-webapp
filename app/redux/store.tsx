import {configureStore} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import userSlice from "./features/user-slice";
import sessionStorage from "redux-persist/lib/storage/session";


const persistConfig = {
	key: "user",
	storage: sessionStorage,
};

const persistedUserReducer = persistReducer(persistConfig, userSlice);

export const store = configureStore({
	 reducer: {
    user: persistedUserReducer,
  },
	devTools: process.env.NODE_ENV !== "production",
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			serializableCheck: false,
		});
	},
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;