import { createSlice } from '@reduxjs/toolkit';
import { UserStateType } from './typedef';

const initialState: UserStateType = {
	email: null,
	token: null,
	id: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, { payload }) {
			state.email = payload.email;
			state.id = payload.id;
			state.token = payload.token;
		},
		removeUser(state) {
			state.email = null;
			state.id = null;
			state.token = null;
		},
	},
});

export const { setUser, removeUser } = userSlice.actions;
