import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getTasks } from "./tasksAPI";
import { RootState } from "../../app/store";
import IToDo from "../shared/interfaces/IToDo";
import { filterTasks } from "./utils/filterTasks";

export const loadTasks = createAsyncThunk(
  'tasks/getTasks',
  async () => {
    const response: Array<IToDo> = await getTasks();

    return response;
  }
);

interface IFilterArgs {
  filter: string;
  value: string;
}

interface TasksState {
  filteredTasks: Array<IToDo>;
  tasks: Array<IToDo>;
  page: number;
}

const initialState: TasksState = {
  filteredTasks: [],
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
      const updatedTaskId: number = action.payload.taskId;
      const indexOriginalData: number = updatedTasks.findIndex(task => task.id === updatedTaskId);
      let updatedToDo: IToDo = updatedTasks[indexOriginalData];
      
      updatedToDo.completed = action.payload.isCompleted;
      updatedTasks[indexOriginalData] = updatedToDo;
      state.tasks = updatedTasks;
      
      let updatedFilteredTasks: Array<IToDo> = [...state.filteredTasks];
      const indexFilteredData = updatedFilteredTasks.findIndex(task => task.id === updatedTaskId);
      updatedFilteredTasks[indexFilteredData] = updatedToDo;
      state.filteredTasks = updatedFilteredTasks;
    },
    filterBy: (state, action: PayloadAction<IFilterArgs>) => {
      state.filteredTasks = filterTasks(action.payload.filter, action.payload.value, state.tasks);
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(loadTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.filteredTasks = action.payload;
    })
  }
})

export const { updatePageNumber, updateToDoState, filterBy } = tasksSlice.actions;

export const filteredTasks = (state: RootState) => state.tasks.filteredTasks;
export const tasks = (state: RootState) => state.tasks.tasks;
export const page = (state: RootState) => state.tasks.page;

export default tasksSlice.reducer;
