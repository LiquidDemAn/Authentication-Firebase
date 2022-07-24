import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthForm } from '../../components/common/auth-form';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setError } from '../services/user.slice';
import { ErrorsEnum } from '../services/typedef';
import { getError, getAuthStatus } from '../services/selectors';
import { AuthFormIdEnum } from '../../components/common/auth-form/auth-form';
import { PathsEnum } from '../../App';
import { UserNotFoundAlert } from '../../components/alerts/user-not-found-alert';
import { PageTitle } from '../../components/common/page-title';
import { useAuthMethods } from '../../hooks/use-auth-methods';

export const LoginPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const error = useAppSelector(getError);
	const isAuth = useAppSelector(getAuthStatus);
	const { login } = useAuthMethods();

	useEffect(() => {
		if (isAuth === true) {
			navigate(`${PathsEnum.Home}`);
		}
	}, [isAuth, navigate]);

	useEffect(() => {
		return () => {
			if (error) {
				dispatch(setError(null));
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const onSubmit = (
		event: React.FormEvent<HTMLButtonElement>,
		email: string,
		password: string
	) => {
		event.preventDefault();
		login(email, password);
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
