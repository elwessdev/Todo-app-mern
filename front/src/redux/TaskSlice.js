import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const BackURL = import.meta.env.VITE_SERVER_URL;

export const GetAllTask = createAsyncThunk("task/all", async() => {
    try {
        const result = await axios.get(`${BackURL}/task/all`, {
            withCredentials: true,
        });
        // console.log(result.data);
        return result.data;
    } catch (error) {
        console.log(error);
    }
});

export const AddNewTask = createAsyncThunk("task/add", async(task) => {
    try {
        await fetch(`${BackURL}/task/add`,{
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newT: task})
        })
        // console.log(t.status);
    } catch (error) {
        console.log(error);
    }
});

export const DeleteTask = createAsyncThunk("task/delete", async(id) => {
    try {
        await fetch(`${BackURL}/task/delete/${id}`,{
            method: "DELETE",
        })
        // console.log(t.status);
    } catch (error) {
        console.log(error);
    }
});

export const EditTask = createAsyncThunk("task/edit", async (infos) => {
    try {
        const req = await fetch(`${BackURL}/task/edit/${infos.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: infos.task }),
        });
        const data = await req.json();
        return data; 
    } catch (error) {
        console.log("Error in EditTask:", error);
    }
});

export const TaskStatus = createAsyncThunk("task/status", async (infos) => {
    try {
        const req = await fetch(`${BackURL}/task/status/${infos.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: infos.status }),
        });
        const data = await req.json();
        return data; 
    } catch (error) {
        console.log("Error in TaskStatus:", error);
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