import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./slices/userSlice";
import { configureStore } from "@reduxjs/toolkit";

const persistConfig = {
    key: "root",
    storage
}

const persistedUserReduer = persistReducer(persistConfig, userSlice)

export const Store = configureStore({
    reducer:{
        user: persistedUserReduer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                  'persist/PERSIST',
                  'persist/REHYDRATE',
                  'persist/PAUSE',
                  'persist/PURGE',
                  'persist/REGISTER',
                ],
              },
        })
    }
})

export const persistor = persistStore(Store)