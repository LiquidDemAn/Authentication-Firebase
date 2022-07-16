import './new-password-page.scss';
import { FormTitle } from '../../components/common/form-title';
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
import { PathsEnum } from '../../App';
import { Link, useNavigate } from 'react-router-dom';
import { PasswordsNotMatchAlert } from '../../components/alerts/passwords-not-match-alert';
import { WeakPasswordAlert } from '../../components/alerts/weak-password-alert';
import { ExpiredCodeAlert } from '../../components/alerts/expired-code-alert';
import { ResetPassCodeUsedAlert } from '../../components/alerts/reset-pass-code-used-alert';

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
		<div className='new-password__wrapper'>
			{/* Alerts */}
			{error === ErrorsEnum.PasswordsNotMatch && <PasswordsNotMatchAlert />}
			{error === ErrorsEnum.WeakPassword && <WeakPasswordAlert />}
			{error === ErrorsEnum.ExpiredCode && <ExpiredCodeAlert />}
			{error === ErrorsEnum.InvalidCode && <ResetPassCodeUsedAlert />}
			{/* /Alerts */}

			<FormTitle>Confirm New Password</FormTitle>

			{success ? (
				<>
					<p className='new-password__text'>Password successfully changed! </p>
					<Link to={`/${PathsEnum.Login}`}>Go to Login?</Link>
				</>
			) : (
				<>
					<NewPasswordForm onSubmit={onSubmit} />
					<Link to={`/${PathsEnum.Login}`}>Go to Login?</Link>
				</>
			)}
		</div>
	);
};
