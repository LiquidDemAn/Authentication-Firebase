import { FormTitle } from '../../components/common/form-title';
import { Wrapper } from '../../components/common/wrapper';
import { NewPasswordForm } from '../../components/new-password/new-password-form';
import { useQuery } from '../../hooks/use-query';
import { confirmPasswordReset, getAuth } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setError } from '../services/user.slice';
import { useAppSelector } from '../../store/hooks';
import { getError } from '../services/selectors';
import { useState } from 'react';
import { FirebaseError } from 'firebase/app';
import { ErrorsEnum } from '../services/typedef';
import { Alert } from 'react-bootstrap';
import { PathsEnum } from '../../App';
import { Link } from 'react-router-dom';

export const NewPasswordPage = () => {
	const dispatch = useDispatch();
	const error = useAppSelector(getError);
	const query = useQuery();
	const oobCode = query.get('oobCode');
	const auth = getAuth();
	const [success, setSuccess] = useState(false);

	const onSubmit = (
		event: React.FormEvent<HTMLButtonElement>,
		newPassword: string,
		confirmNewPassword: string
	) => {
		event.preventDefault();

		if (error) {
			dispatch(setError(null));
		}

		if (newPassword === confirmNewPassword) {
			confirmPasswordReset(auth, oobCode!, newPassword)
				.then(() => {
					setSuccess(true);
					console.log(success);
				})
				.catch((error: FirebaseError) => {
					const errorCode = error.code;
					console.log(errorCode);
					dispatch(setError(errorCode as ErrorsEnum));
				});
		} else {
			setTimeout(() => {
				dispatch(setError(ErrorsEnum.PasswordsNotMatch));
			}, 1000);
		}
	};

	return (
		<Wrapper>
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
					The code has expired! You must confirm your mail again. Go back to{' '}
					<Link to={`/${PathsEnum.ResetPassword}`}>Reset page</Link>
				</Alert>
			) : (
				<></>
			)}

			<FormTitle>Confirm New Password</FormTitle>
			<NewPasswordForm onSubmit={onSubmit} />

			<Link to={`/${PathsEnum.Login}`}>Go to login?</Link>
		</Wrapper>
	);
};
