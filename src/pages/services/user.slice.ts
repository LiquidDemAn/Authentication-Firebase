import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserStateType, UserType, ErrorsEnum } from './typedef';

const initialState: UserStateType = {
	email: null,
	token: null,
	id: null,
	error: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, { payload }: PayloadAction<UserType>) {
			state.email = payload.email;
			state.id = payload.id;
			state.token = payload.token;
		},
		removeUser(state) {
			state.email = null;
			state.id = null;
			state.token = null;
		},
		setError(state, { payload }: PayloadAction<ErrorsEnum>) {
			state.error = payload;
		},
	},
});

export const { setUser, removeUser, setError } = userSlice.actions;
