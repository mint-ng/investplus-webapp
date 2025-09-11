import {configureStore} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import userSlice from "./features/user-slice";
import sessionStorage from "redux-persist/lib/storage/session";

// const rootReducer = combineSlices(userSlice);

const persistConfig = {
	key: "root",
	storage: sessionStorage,
	blacklist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, userSlice);

export const store = configureStore({
	reducer: persistedReducer,
	devTools: process.env.NODE_ENV !== "production",
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			serializableCheck: false,
		});
	},
});

export const persistor = persistStore(store);