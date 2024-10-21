import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

export const AddTask = createAsyncThunk("task/add", async(task) => {
    try {
        const result = await axios.post(`http://localhost:3001/task/add`, task); //change this with backend link
    } catch (error) {
        console.log(error);
    }
});

export const GetAllTask = createAsyncThunk("task/all", async() => {
    try {
        const result = await axios.get('http://localhost:3001/task/all', {
            withCredentials: true,
        }); //change this with backend link
        console.log(result.data);
        return result.data;
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
export const { } = TaskSlice.actions

export default TaskSlice.reducer