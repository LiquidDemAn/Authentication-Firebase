import { auth } from '../firebase';
import {
	createUserWithEmailAndPassword,
	sendEmailVerification,
	signInWithEmailAndPassword,
	User,
} from 'firebase/auth';
import { useAppDispatch } from '../store/hooks';
import { setError } from '../pages/services/user.slice';
import { FirebaseError } from 'firebase/app';
import { ErrorsEnum } from '../pages/services/typedef';
import { SetStateAction } from 'react';

export const useAuthMethods = () => {
	const dispatch = useAppDispatch();

	const login = (email: string, password: string) => {
		return signInWithEmailAndPassword(auth, email, password).catch(
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
				dispatch(setError(null));
				
				if (resendHandler) {
					resendHandler(true);
				}
			})
			.catch((error: FirebaseError) => {
				dispatch(setError(error.code as ErrorsEnum));
			});
	};

	const register = (email: string, password: string) => {
		return createUserWithEmailAndPassword(auth, email, password)
			.then(({ user }) => {
				emailVerification(user);
			})
			.catch((error: FirebaseError) => {
				dispatch(setError(error.code as ErrorsEnum));
			});
	};

	return {
		login,
		emailVerification,
		register,
	};
};
