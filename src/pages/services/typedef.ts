export type UserType = {
	email: null | string;
	token: null | string;
	id: null | string;
};

export enum ErrorsEnum {
	EmailError = 'auth/invalid-email',
	PasswordError = 'auth/wrong-password',
	InternalError = 'auth/internal-error',
}

export type UserStateType = {
	email: null | string;
	token: null | string;
	id: null | string;
	error: null | ErrorsEnum;
};
