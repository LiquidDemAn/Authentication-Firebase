import { FirebaseError } from 'firebase/app';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useRef, useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Verification } from '../../components/common/verification';
import { VerificationEnum } from '../../components/common/verification/verification';
import { Wrapper } from '../../components/common/wrapper';
import { ResetPasswordForm } from '../../components/reset-password/reset-password-form';
import { useAppSelector } from '../../store/hooks';
import { getError } from '../services/selectors';
import { ErrorsEnum } from '../services/typedef';
import { setError } from '../services/user.slice';
import { FormTitle } from '../../components/common/form-title';
import { Link } from 'react-router-dom';
import { PathsEnum } from '../../App';

export const ResetPasswordPage = () => {
	const dispatch = useDispatch();
	const auth = getAuth();
	const emailRef = useRef('');
	const error = useAppSelector(getError);
	const [sent, setSent] = useState(false);
	const [resendAlert, setResendAlert] = useState(false);

	const resendHandle = () => {
		setResendAlert(false);

		sendPasswordResetEmail(auth, emailRef.current)
			.then(() => {
				setResendAlert(true);
			})
			.catch((error: FirebaseError) => {
				const errorCode = error.code;
				console.log(errorCode);
				dispatch(setError(errorCode as ErrorsEnum));
			});
	};

	const sendHandle = (
		event: React.FormEvent<HTMLButtonElement>,
		email?: string
	) => {
		event.preventDefault();

		if (error) {
			dispatch(setError(null));
		}

		if (email) {
			sendPasswordResetEmail(auth, email, {
				url: `${PathsEnum.Host}/${PathsEnum.Login}`,
			})
				.then(() => {
					setSent(true);
					emailRef.current = email;
				})
				.catch((error: FirebaseError) => {
					const errorCode = error.code;
					console.log(errorCode);
					dispatch(setError(errorCode as ErrorsEnum));
				});
		} else {
			dispatch(setError(ErrorsEnum.EmailError));
		}
	};

	return (
		<Wrapper>
			<>
				{error === ErrorsEnum.UserNotFoundError && (
					<Alert variant='danger'>User Not Found!</Alert>
				)}

				{resendAlert && <Alert variant='success'>Letter Resended!</Alert>}

				{sent ? (
					<Verification
						email={emailRef.current}
						type={VerificationEnum.ResetPassword}
						resendHandle={resendHandle}
					/>
				) : (
					<>
						<FormTitle>Reset Password</FormTitle>
						<ResetPasswordForm onClick={sendHandle} />
						<Link to={`/${PathsEnum.Login}`}>Back to Login?</Link>
					</>
				)}
			</>
		</Wrapper>
	);
};
