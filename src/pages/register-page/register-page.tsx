import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { AuthForm } from '../../components/common/auth-form';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
	getAuth,
	createUserWithEmailAndPassword,
	sendEmailVerification,
} from 'firebase/auth';
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

export const RegisterPage = () => {
	const auth = getAuth();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const error = useAppSelector(getError);
	const isAuth = useAppSelector(getAuthStatus);
	const user = useAppSelector(getUser);
	const emailVerifiedStatus = useAppSelector(getEmailVerifiedStatus);
	const [resendStatus, setResendStatus] = useState(false);

	useEffect(() => {
		if (isAuth === true && emailVerifiedStatus) {
			navigate(`${PathsEnum.Home}`);
		}
	}, [isAuth, navigate, emailVerifiedStatus]);

	const onSubmit = (
		event: React.FormEvent<HTMLButtonElement>,
		email: string,
		password: string
	) => {
		event.preventDefault();

		createUserWithEmailAndPassword(auth, email, password)
			.then(({ user }) => {
				sendEmailVerification(user)
					.then()
					.catch((error: FirebaseError) => {
						dispatch(setError(error.code as ErrorsEnum));
					});
			})
			.catch((error: FirebaseError) => {
				dispatch(setError(error.code as ErrorsEnum));
			});
	};

	const resendHandle = () => {
		const currnetUser = auth.currentUser;

		if (currnetUser) {
			sendEmailVerification(currnetUser)
				.then(() => {
					setResendStatus(true);
				})
				.catch((error: FirebaseError) => {
					dispatch(setError(error.code as ErrorsEnum));
				});
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
					<AuthForm
						title='Register'
						formId={AuthFormIdEnum.Register}
						btnName='Sign up'
						onSubmit={onSubmit}
					/>
					<span>
						Alreadey have an account? <Link to='/login'>Sign In</Link>
					</span>
				</>
			)}
		</>
	);
};
