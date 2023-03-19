import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import tasksReducer from '../features/tasks/tasksSlice';
import userInfoReducer from '../features/shared/usersSlice';

export const store = configureStore({
  reducer: {
    usersInfo: userInfoReducer,
    tasks: tasksReducer
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
