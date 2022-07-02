import { UserType } from './typedef';
import { AppState } from './../../store/typedef';

export const getUser = (state: AppState): UserType => {
	return {
		id: state.user.id,
		email: state.user.email,
		token: state.user.token,
		emailVerified: state.user.emailVerified,
	};
};

export const getAuthStatus = (state: AppState) => state.user.isAuth;
export const getError = (state: AppState) => state.user.error;
