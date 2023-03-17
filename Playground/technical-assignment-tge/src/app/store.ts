import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import userInfoReducer from '../features/shared/usersSlice';

export const store = configureStore({
  reducer: {
    usersInfo: userInfoReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
