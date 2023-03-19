import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { editUserPosts, getUser, getUserPosts, getUsersList, updateUser } from './usersAPI';
import { RootState } from '../../app/store';
import IUserData from './interfaces/IUserData';
import IPost from './interfaces/IPosts';

interface IUpdateUserPostsParams {
  userId: number;
  posts: Array<IPost>;
}

interface IUpdateUserParams {
  userId: number;
  updatedFields: Array<string>;
  formData: Record<string, string | number>;
}

interface UserListState {
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

export const updateUserInfo = createAsyncThunk("users/updateUser",
  async ({updatedFields, formData}: IUpdateUserParams, {getState}) => {
    const state: any = getState();
    const currentUserData = {...state.usersInfo.chosenUser};
    const updatedUserInfo = await updateUser(updatedFields, formData, currentUserData)

    console.log('updatedUserInfo: ', updatedUserInfo);
    return updatedUserInfo;
});

export const loadUserPosts = createAsyncThunk(
  'users/getUserPosts',
  async (id: number) => {
    const response: Array<IPost> = await getUserPosts(id);

    return response;
  }
);

export const updateUserPosts = createAsyncThunk(
  'users/editUserPosts',
  async ({userId, posts}: IUpdateUserPostsParams) => {
    const response: Array<IPost> = await editUserPosts(userId, posts);

    return response;
  }
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateSelectedUserId: (state, action: PayloadAction<number>) => {
      state.chosenUserId = action.payload;
    },
    updateChosenUser: (state, action: PayloadAction<IUserData>) => {
      state.chosenUser = action.payload;
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
      .addCase(loadUserList.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.chosenUser = action.payload;
      })
      .addCase(loadUserPosts.fulfilled, (state, action) => {
        state.usersPosts = action.payload;
      }).addCase(updateUserPosts.fulfilled, (state, action) => {
        state.usersPosts = action.payload;
      }).addCase(updateUserInfo.fulfilled, (state, action) => {
        state.chosenUser = action.payload;
      });
      
  },
});

export const { updateChosenUser, updateSelectedUserId } = usersSlice.actions;

export const chosenUserId = (state: RootState) => state.usersInfo.chosenUserId;
export const listOfUsers = (state: RootState) => state.usersInfo.listOfUsers;
export const chosenUser = (state: RootState) => state.usersInfo.chosenUser;
export const usersPosts = (state: RootState) => state.usersInfo.usersPosts;
export const status = (state: RootState) => state.usersInfo.status;

export default usersSlice.reducer;
