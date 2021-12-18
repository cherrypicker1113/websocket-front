import {configureStore} from "@reduxjs/toolkit";
import samplesReducer from "../sample/slice/samplesSlice";

export const store = configureStore({
    reducer: {
        samples: samplesReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});

export type RootState = ReturnType<typeof store.getState>;