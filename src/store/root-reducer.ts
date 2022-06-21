import { userSlice } from './../pages/services/user.slice';
import { combineReducers } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
	user: userSlice.reducer,
});
