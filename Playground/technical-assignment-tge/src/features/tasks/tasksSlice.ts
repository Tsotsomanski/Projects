import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import IToDo from "../shared/interfaces/IToDo";
import { RootState } from "../../app/store";
import { getTasks } from "./tasksAPI";

export const loadTasks = createAsyncThunk(
  'tasks/getTasks',
  async () => {
    const response: Array<IToDo> = await getTasks();

    return response;
  }
);

interface TasksState {
  tasks: Array<IToDo>;
  page: number;
}

const initialState: TasksState = {
  tasks: [],
  page: 1
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    updatePageNumber: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    updateToDoState: (state, action: PayloadAction<any>) => {
      let updatedTasks: Array<IToDo> = [...state.tasks];
      let updatedToDo: IToDo = updatedTasks[action.payload.todoIndex];
      
      updatedToDo.completed = action.payload.isCompleted;
      updatedTasks[action.payload.todoIndex] = updatedToDo;
      state.tasks = updatedTasks;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(loadTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
    })
  }
})

export const { updatePageNumber, updateToDoState } = tasksSlice.actions;

export const tasks = (state: RootState) => state.tasks.tasks;
export const page = (state: RootState) => state.tasks.page;

export default tasksSlice.reducer;