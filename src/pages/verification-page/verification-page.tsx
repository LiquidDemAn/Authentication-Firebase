import { applyActionCode, getAuth } from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PathsEnum } from '../../App';
import { useQuery } from '../../hooks/use-query';
import { Link } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setError } from '../services/user.slice';
import { ErrorsEnum } from '../services/typedef';
import { getEmailVerifiedStatus, getError } from '../services/selectors';

enum ModeEnum {
	VerifyEmail = 'verifyEmail',
	ResetPassword = 'resetPassword',
}

export const VerificationPage = () => {
	const dispatch = useAppDispatch();
	const auth = getAuth();
	const navigate = useNavigate();
	const query = useQuery();
	const mode = query.get('mode');
	const oobCode = query.get('oobCode');
	const error = useAppSelector(getError);
	const emailVerified = useAppSelector(getEmailVerifiedStatus);

	useEffect(() => {
		if (
			(error === ErrorsEnum.ExpiredActionCode ||
				error === ErrorsEnum.ActionCodeUsed) &&
			mode === ModeEnum.VerifyEmail &&
			emailVerified
		) {
			navigate(`/${PathsEnum.Register}/${PathsEnum.Success}`);
		}
	}, [error, emailVerified, navigate, mode]);

	useEffect(() => {
		if (oobCode) {
			applyActionCode(auth, oobCode)
				.then(() => {
					auth.currentUser?.reload();

					if (mode === ModeEnum.VerifyEmail) {
						navigate(
							`/${PathsEnum.Register}/${PathsEnum.Success}?oobCode=${oobCode}`
						);
					}
					if (mode === ModeEnum.ResetPassword) {
						navigate(
							`/${PathsEnum.ResetPassword}/${PathsEnum.NewPassword}?oobCode=${oobCode}`
						);
					}
				})
				.catch((error: FirebaseError) => {
					const errorCode = error.code;
					console.log(errorCode);
					dispatch(setError(errorCode as ErrorsEnum));
				});
		}
	}, [oobCode, mode, auth, dispatch, navigate]);

	if (
		error === ErrorsEnum.ExpiredActionCode ||
		error === ErrorsEnum.ActionCodeUsed
	) {
		return (
			<>
				<h2>Error!</h2>
				<p>Activation code is invalid or link is expired.</p>
				{mode === ModeEnum.VerifyEmail && (
					<p>
						You must verify your email again! Go to Register Page and click
						"Resend Leter"{' '}
						<Link to={`/${PathsEnum.Register}`}>Go to Register.</Link>
					</p>
				)}
				{mode === ModeEnum.ResetPassword && (
					<p>
						You must reset your password again!{' '}
						<Link to={`/${PathsEnum.ResetPassword}`}>Go to Reset.</Link>
					</p>
				)}
			</>
		);
	}
	return <h2>Redirecting.....</h2>;
};
