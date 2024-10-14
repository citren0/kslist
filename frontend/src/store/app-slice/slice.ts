import { createSlice } from '@reduxjs/toolkit'

export interface AppState { }

const initialState: AppState = { };

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers:
    { }
});

export const { } = appSlice.actions;

export default appSlice;