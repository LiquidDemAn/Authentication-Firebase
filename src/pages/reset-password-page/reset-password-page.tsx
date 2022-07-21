import { FirebaseError } from 'firebase/app';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Verification } from '../../components/common/verification';
import { VerificationEnum } from '../../components/common/verification/verification';
import { ResetPasswordForm } from '../../components/reset-password/reset-password-form';
import { useAppSelector } from '../../store/hooks';
import { getError, getAuthStatus } from '../services/selectors';
import { ErrorsEnum } from '../services/typedef';
import { setError } from '../services/user.slice';
import { PageTitle } from '../../components/common/page-title';
import { Link, useNavigate } from 'react-router-dom';
import { PathsEnum } from '../../App';
import { UserNotFoundAlert } from '../../components/alerts/user-not-found-alert';
import { LetterResendAlert } from '../../components/alerts/letter-resend-alert';

export const ResetPasswordPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isAuth = useAppSelector(getAuthStatus);
	const auth = getAuth();
	const emailRef = useRef('');
	const error = useAppSelector(getError);
	const [sent, setSent] = useState(false);
	const [resendStatus, setResendStatus] = useState(false);

	useEffect(() => {
		if (isAuth) {
			navigate(PathsEnum.Host);
		}
	}, [isAuth, navigate]);

	useEffect(() => {
		return () => {
			dispatch(setError(null));
		};
	}, [dispatch]);

	const resendHandle = () => {
		sendPasswordResetEmail(auth, emailRef.current)
			.then(() => {
				setResendStatus(true);
			})
			.catch((error: FirebaseError) => {
				dispatch(setError(error.code as ErrorsEnum));
			});
	};

	const onSubmit = (
		event: React.FormEvent<HTMLButtonElement>,
		email?: string
	) => {
		event.preventDefault();

		if (error) {
			dispatch(setError(null));
		}

		if (email) {
			sendPasswordResetEmail(auth, email)
				.then(() => {
					setSent(true);
					emailRef.current = email;
				})
				.catch((error: FirebaseError) => {
					dispatch(setError(error.code as ErrorsEnum));
				});
		}
	};

	return (
		<>
			{/* Alerts */}
			{error === ErrorsEnum.UserNotFoundError && <UserNotFoundAlert />}
			{resendStatus && <LetterResendAlert />}
			{/* /Alerts */}

			{sent ? (
				<Verification
					title='Reset Password'
					email={emailRef.current}
					type={VerificationEnum.ResetPassword}
					resendHandle={resendHandle}
					resendStatus={resendStatus}
				/>
			) : (
				<>
					<PageTitle>Reset Password</PageTitle>
					<ResetPasswordForm onSubmit={onSubmit} />
					<Link to={`/${PathsEnum.Login}`}>Back to Login?</Link>
				</>
			)}
		</>
	);
};
