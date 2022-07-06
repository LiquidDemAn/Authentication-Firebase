export type UserType = {
	email: null | string;
	token: null | string;
	id: null | string;
	emailVerified: boolean;
};

export enum ErrorsEnum {
	EmailError = 'auth/invalid-email',
	PasswordError = 'auth/wrong-password',
	InternalError = 'auth/internal-error',
	UserNotFoundError = 'auth/user-not-found',
}

export type UserStateType = {
	email: null | string;
	token: null | string;
	id: null | string;
	isAuth: null | boolean;
	emailVerified: boolean;
	error: null | ErrorsEnum;
};
