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
import { PageTitle } from '../../components/common/page-title';

export const LoginPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const error = useAppSelector(getError);
	const isAuth = useAppSelector(getAuthStatus);

	useEffect(() => {
		if (isAuth === true) {
			navigate(`${PathsEnum.Host}`);
		}
	}, [isAuth, navigate]);

	useEffect(() => {
		return () => {
			dispatch(setError(null));
		};
	}, [dispatch]);

	const onSubmit = (
		event: React.FormEvent<HTMLButtonElement>,
		email: string,
		password: string
	) => {
		const auth = getAuth();
		event.preventDefault();

		signInWithEmailAndPassword(auth, email, password).catch(
			(error: FirebaseError) => {
				dispatch(setError(error.code as ErrorsEnum));
			}
		);
	};

	return (
		<>
			{error === ErrorsEnum.UserNotFoundError && <UserNotFoundAlert />}

			<PageTitle>Login to your account</PageTitle>
			<AuthForm formId={AuthFormIdEnum.Login} onSubmit={onSubmit} />
			<span>
				Don't have an account?{' '}
				<Link to={`/${PathsEnum.Register}`}>Sign Up</Link>
			</span>
		</>
	);
};
