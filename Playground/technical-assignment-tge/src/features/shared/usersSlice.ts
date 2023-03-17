import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { editUserPosts, getUser, getUserPosts, getUsersList } from './usersAPI';
import { RootState, AppThunk } from '../../app/store';
import IUserData from './interfaces/IUserData';
import IPost from './interfaces/IPosts';

export interface UserListState {
  chosenUser: IUserData | undefined;
  chosenUserId: number | undefined;
  listOfUsers: Array<IUserData>;
  usersPosts: any;
  status: string;
}

const initialState: UserListState = {
  chosenUserId: undefined,
  chosenUser: undefined,
  usersPosts: undefined,
  status: "loading",
  listOfUsers: []
};

interface UpdateUserParams {
  id: number;
  posts: Array<IPost>;
}

export const loadUserList = createAsyncThunk(
  'users/getUsersList',
  async () => {
    const response: Array<IUserData> = await getUsersList();

    return response;
  }
);

export const loadUser = createAsyncThunk(
  'users/getUser',
  async (id: number) => {
    const response: IUserData = await getUser(id);

    return response;
  }
);

export const loadUserPosts = createAsyncThunk(
  'users/getUserPosts',
  async (id: number) => {
    const response: Array<IPost> = await getUserPosts(id);

    return response;
  }
);

export const updateUserPosts = createAsyncThunk(
  'users/editUserPosts',
  async ({id, posts}: UpdateUserParams) => {
    await editUserPosts(id, posts);
    
    return posts;
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    increment: (state) => {
    },
    decrement: (state) => {
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
    },
    updateSelectedUserId: (state, action: PayloadAction<number>) => {
      state.chosenUserId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUserList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadUserList.fulfilled, (state, action) => {
        state.status = 'idle';
        state.listOfUsers = action.payload;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.chosenUser = action.payload;
      })
      .addCase(loadUserPosts.fulfilled, (state, action) => {
        state.usersPosts = action.payload;
      }).addCase(updateUserPosts.fulfilled, (state, action) => {
        state.usersPosts = action.payload;
      });
  },
});

export const { increment, decrement, incrementByAmount, updateSelectedUserId } = usersSlice.actions;

export const chosenUserId = (state: RootState) => state.usersInfo.chosenUserId;
export const listOfUsers = (state: RootState) => state.usersInfo.listOfUsers;
export const chosenUser = (state: RootState) => state.usersInfo.chosenUser;
export const usersPosts = (state: RootState) => state.usersInfo.usersPosts;
export const selectCount = (state: RootState) => state.counter.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd =
  (amount: number): AppThunk =>
  (dispatch, getState) => {
    const currentValue = selectCount(getState());
    if (currentValue % 2 === 1) {
      dispatch(incrementByAmount(amount));
    }
  };

export default usersSlice.reducer;
