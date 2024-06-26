import { configureStore } from '@reduxjs/toolkit';
import userInfoReducer from '../features/users/userInfoSlice';

export const store = configureStore({
    reducer: {
        userInfo: userInfoReducer,
    },
});
