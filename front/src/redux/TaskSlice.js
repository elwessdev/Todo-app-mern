import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const BackURL = import.meta.env.VITE_SERVER_URL;

export const GetAllTask = createAsyncThunk("task/all", async() => {
    try {
        const result = await axios.get(`${BackURL}/task/all`, {
            withCredentials: true,
        });
        console.log(result.data);
        return result.data;
    } catch (error) {
        console.log(error);
    }
});

export const AddNewTask = createAsyncThunk("task/add", async(task) => {
    try {
        const t = await fetch(`${BackURL}/task/add`,{
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newT: task})
        })
        console.log(t.status);
    } catch (error) {
        console.log(error);
    }
});

const initialState = ({
    tasks: []
})

export const TaskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
    .addCase(GetAllTask.fulfilled, (state, action) => {
        state.tasks = action.payload.tasks;
    });
  },
})

// Action creators are generated for each case reducer function
export const {} = TaskSlice.actions

export default TaskSlice.reducer