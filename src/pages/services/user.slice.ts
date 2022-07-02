import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserStateType, UserType, ErrorsEnum } from './typedef';

const initialState: UserStateType = {
	email: null,
	token: null,
	id: null,
	isAuth: null,
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
			state.error = null;
			state.isAuth = true;
		},
		removeUser(state) {
			state.email = null;
			state.id = null;
			state.token = null;
			state.error = null;
			state.isAuth = false;
		},
		setError(state, { payload }: PayloadAction<ErrorsEnum | null>) {
			state.error = payload;
		},
		setAuthStatus(state, { payload }: PayloadAction<null | boolean>) {
			state.isAuth = payload;
		},
	},
});

export const { setUser, removeUser, setError, setAuthStatus } =
	userSlice.actions;
