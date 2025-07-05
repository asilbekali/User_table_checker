// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import selectedUsersReducer from "./selectedUsersReducer";

export const store = configureStore({
    reducer: {
        selectedUsers: selectedUsersReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
