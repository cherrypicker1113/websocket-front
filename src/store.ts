import {configureStore} from "@reduxjs/toolkit";
import samplesReducer from "./sample/slice/samplesSlice";
import chatReducer from './chat/slice/chatSlice';

export const store = configureStore({
    reducer: {
        samples: samplesReducer,
        chat: chatReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
});

export type RootState = ReturnType<typeof store.getState>;