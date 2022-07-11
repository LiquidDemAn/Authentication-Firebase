import { FormTitle } from '../../components/common/form-title';
import { Wrapper } from '../../components/common/wrapper';
import { NewPasswordForm } from '../../components/new-password/new-password-form';
import { useQuery } from '../../hooks/use-query';
import { confirmPasswordReset, getAuth } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setError } from '../services/user.slice';
import { useAppSelector } from '../../store/hooks';
import { getError, getAuthStatus } from '../services/selectors';
import { useEffect, useState } from 'react';
import { FirebaseError } from 'firebase/app';
import { ErrorsEnum } from '../services/typedef';
import { Alert } from 'react-bootstrap';
import { PathsEnum } from '../../App';
import { Link, useNavigate } from 'react-router-dom';

export const NewPasswordPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const query = useQuery();
	const error = useAppSelector(getError);
	const isAuth = useAppSelector(getAuthStatus);
	const oobCode = query.get('oobCode');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		if (isAuth) {
			navigate(PathsEnum.Home);
		}
	}, [isAuth, navigate]);

	useEffect(() => {
		if (!oobCode) {
			navigate(`/${PathsEnum.ResetPassword}`);
		}
	}, [oobCode, navigate]);

	const onSubmit = (
		event: React.FormEvent<HTMLButtonElement>,
		newPassword: string,
		confirmNewPassword: string
	) => {
		const auth = getAuth();
		event.preventDefault();

		if (error) {
			dispatch(setError(null));
		}

		if (oobCode && newPassword === confirmNewPassword) {
			confirmPasswordReset(auth, oobCode, newPassword)
				.then(() => {
					setSuccess(true);
				})
				.catch((error: FirebaseError) => {
					dispatch(setError(error.code as ErrorsEnum));
				});
		} else {
			setTimeout(() => {
				dispatch(setError(ErrorsEnum.PasswordsNotMatch));
			}, 1000);
		}
	};

	return (
		<Wrapper>
			{/* Errors */}
			{error === ErrorsEnum.PasswordsNotMatch ? (
				<Alert variant='warning'>Passwords do not match!</Alert>
			) : (
				<></>
			)}

			{error === ErrorsEnum.WeakPassword ? (
				<Alert variant='warning'>Weak password!</Alert>
			) : (
				<></>
			)}

			{error === ErrorsEnum.ExpiredActionCode ? (
				<Alert variant='danger'>
					The link has expired! You must confirm your mail again. Go back to{' '}
					<Link to={`/${PathsEnum.ResetPassword}`}>Reset page</Link>
				</Alert>
			) : (
				<></>
			)}

			{error === ErrorsEnum.ActionCodeUsed ? (
				<Alert variant='danger'>
					This link has already been used to change your password. If you forgot
					your password, go to the{' '}
					<Link to={`/${PathsEnum.ResetPassword}`}>Reset page</Link>
				</Alert>
			) : (
				<></>
			)}
			{/* /Errors */}

			<FormTitle>Confirm New Password</FormTitle>
			
			{success ? (
				<span>
					Password successfully changed!{' '}
					<Link to={`/${PathsEnum.Login}`}>Go to Login?</Link>
				</span>
			) : (
				<>
					<NewPasswordForm onSubmit={onSubmit} />
					<Link to={`/${PathsEnum.Login}`}>Go to Login?</Link>
				</>
			)}
		</Wrapper>
	);
};
