import { createSlice } from '@reduxjs/toolkit';
import { UserStateType } from './typedef';

const initialState: UserStateType = {};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {}
})