export type UserType = {
	email: null | string;
	token: string;
	id: string;
};

export enum ErrorsEnum {
	EmailError = 'auth/invalid-email',
}

export type UserStateType = {
	email: null | string;
	token: null | string;
	id: null | string;
	error: null | ErrorsEnum;
};
