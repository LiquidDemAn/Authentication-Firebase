import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthForm } from '../../components/common/auth-form';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { setError } from '../services/user.slice';
import { ErrorsEnum } from '../services/typedef';
import { getError, getAuthStatus } from '../services/selectors';
import { FirebaseError } from 'firebase/app';
import { AuthFormIdEnum } from '../../components/common/auth-form/auth-form';
import { PathsEnum } from '../../App';
import { UserNotFoundAlert } from '../../components/alerts/user-not-found-alert';

export const LoginPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const error = useAppSelector(getError);
	const isAuth = useAppSelector(getAuthStatus);

	useEffect(() => {
		if (isAuth === true) {
			navigate(`${PathsEnum.Home}`);
		}
	}, [isAuth, navigate]);

	const handleLogin = (
		event: React.FormEvent<HTMLButtonElement>,
		email: string,
		password: string
	) => {
		const auth = getAuth();
		event.preventDefault();

		signInWithEmailAndPassword(auth, email, password)
			.then()
			.catch((error: FirebaseError) => {
				console.log(error.code);
				dispatch(setError(error.code as ErrorsEnum));
			});
	};

	return (
		<>
			{error === ErrorsEnum.UserNotFoundError && <UserNotFoundAlert />}
			<AuthForm
				formId={AuthFormIdEnum.Login}
				title='Login to your account'
				btnName='Login now'
				handleClick={handleLogin}
			/>
			<span>
				Don't have an account?{' '}
				<Link to={`/${PathsEnum.Register}`}>Sign Up</Link>
			</span>
		</>
	);
};
