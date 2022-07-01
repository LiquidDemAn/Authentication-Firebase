import { UserType } from './typedef';
import { AppState } from './../../store/typedef';

export const getUser = (state: AppState): UserType => {
	return {
		id: state.user.id,
		email: state.user.email,
		token: state.user.token,
	};
};

export const getUserEmail = (state: AppState) => state.user.email;

export const getError = (state: AppState) => state.user.error;
