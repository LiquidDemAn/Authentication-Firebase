import { useNavigate } from 'react-router-dom';
import { getError } from './../pages/services/selectors';
import { auth } from '../firebase';
import {
	User,
	Auth,
	createUserWithEmailAndPassword,
	sendEmailVerification,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	confirmPasswordReset,
	GoogleAuthProvider,
	signInWithPopup,
} from 'firebase/auth';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setError } from '../pages/services/user.slice';
import { FirebaseError } from 'firebase/app';
import { ErrorsEnum } from '../pages/services/typedef';
import { SetStateAction } from 'react';

export const useAuthMethods = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const error = useAppSelector(getError);

	const login = (email: string, password: string) => {
		signInWithEmailAndPassword(auth, email, password).catch(
			(error: FirebaseError) => {
				dispatch(setError(error.code as ErrorsEnum));
			}
		);
	};

	const emailVerification = (
		user: User,
		resendHandler?: (value: SetStateAction<boolean>) => void
	) => {
		sendEmailVerification(user)
			.then(() => {
				if (error) {
					dispatch(setError(null));
				}

				if (resendHandler) {
					resendHandler(true);
				}
			})
			.catch((error: FirebaseError) => {
				dispatch(setError(error.code as ErrorsEnum));
			});
	};

	const register = (email: string, password: string) => {
		createUserWithEmailAndPassword(auth, email, password)
			.then(({ user }) => {
				emailVerification(user);
			})
			.catch((error: FirebaseError) => {
				dispatch(setError(error.code as ErrorsEnum));
			});
	};

	const forgotPassword = (
		email: string,
		handler: (value: SetStateAction<boolean>) => void
	) => {
		sendPasswordResetEmail(auth, email)
			.then(() => {
				handler(true);
			})
			.catch((error: FirebaseError) => {
				dispatch(setError(error.code as ErrorsEnum));
			});
	};

	const resetPassword = (
		oobCode: string,
		password: string,
		handler: (value: SetStateAction<boolean>) => void
	) => {
		confirmPasswordReset(auth, oobCode, password)
			.then(() => {
				handler(true);
			})
			.catch((error: FirebaseError) => {
				dispatch(setError(error.code as ErrorsEnum));
			});
	};

	const signInWithGoogle = () => {
		const provider = new GoogleAuthProvider();

		signInWithPopup(auth, provider).catch((error: FirebaseError) => {
			dispatch(setError(error.code as ErrorsEnum));
		});
	};

	const verifyCode = (
		method: (auth: Auth, oobCode: string) => Promise<void | string>,
		oobCode: string,
		path: string
	) => {
		method(auth, oobCode)
			.then(() => {
				navigate(path);
			})
			.catch((error: FirebaseError) => {
				dispatch(setError(error.code as ErrorsEnum));
			});
	};

	return {
		login,
		emailVerification,
		register,
		forgotPassword,
		resetPassword,
		signInWithGoogle,
		verifyCode,
	};
};
