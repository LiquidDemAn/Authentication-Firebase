import { useEffect, useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthForm } from '../../components/common/auth-form';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { auth } from '../../firebase';
import { setError } from '../services/user.slice';
import {
	getAuthStatus,
	getEmailVerifiedStatus,
	getError,
	getUser,
} from '../services/selectors';
import { ErrorsEnum } from '../services/typedef';
import { AuthFormIdEnum } from '../../components/common/auth-form/auth-form';
import { PathsEnum } from '../../App';
import { Verification } from '../../components/common/verification';
import { VerificationEnum } from '../../components/common/verification/verification';
import { LetterResendAlert } from '../../components/alerts/letter-resend-alert';
import { EmailAlreadyUseAlert } from '../../components/alerts/email-already-use-alert';
import { PageTitle } from '../../components/common/page-title';
import { useAuthMethods } from '../../hooks/use-auth-methods';

export const RegisterPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const error = useAppSelector(getError);
	const isAuth = useAppSelector(getAuthStatus);
	const user = useAppSelector(getUser);
	const emailVerifiedStatus = useAppSelector(getEmailVerifiedStatus);
	const [resendStatus, setResendStatus] = useState(false);
	const { register, emailVerification } = useAuthMethods();

	useEffect(() => {
		if (isAuth === true && emailVerifiedStatus) {
			navigate(`${PathsEnum.Home}`);
		}
	}, [isAuth, navigate, emailVerifiedStatus]);

	useEffect(() => {
		return () => {
			dispatch(setError(null));
		};
	}, [dispatch]);

	const onSubmit = (
		event: FormEvent<HTMLButtonElement>,
		email: string,
		password: string
	) => {
		event.preventDefault();
		register(email, password);
	};

	const resendHandle = () => {
		const currnetUser = auth.currentUser;

		if (currnetUser) {
			emailVerification(currnetUser, setResendStatus);
		}
	};

	return (
		<>
			{isAuth && !emailVerifiedStatus ? (
				<>
					{resendStatus && <LetterResendAlert />}

					<Verification
						title='Email'
						type={VerificationEnum.Register}
						email={user.email}
						resendHandle={resendHandle}
						resendStatus={resendStatus}
					/>
				</>
			) : (
				<>
					{error === ErrorsEnum.EmailAlreadyUse && <EmailAlreadyUseAlert />}
					<PageTitle>Register</PageTitle>
					<AuthForm formId={AuthFormIdEnum.Register} onSubmit={onSubmit} />
					<span>
						Alreadey have an account?{' '}
						<Link to={`/${PathsEnum.Login}`}>Sign In</Link>
					</span>
				</>
			)}
		</>
	);
};
