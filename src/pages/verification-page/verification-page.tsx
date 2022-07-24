import './verification-page.scss';
import { applyActionCode, verifyPasswordResetCode } from 'firebase/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PathsEnum } from '../../App';
import { useQuery } from '../../hooks/use-query';
import { useAppSelector } from '../../store/hooks';
import { ErrorsEnum } from '../services/typedef';
import { getEmailVerifiedStatus, getError } from '../services/selectors';
import { Button } from 'react-bootstrap';
import { useAuthMethods } from '../../hooks/use-auth-methods';

enum ModeEnum {
	VerifyEmail = 'verifyEmail',
	ResetPassword = 'resetPassword',
}

export const VerificationPage = () => {
	const { verifyCode } = useAuthMethods();
	const navigate = useNavigate();
	const query = useQuery();
	const mode = query.get('mode');
	const oobCode = query.get('oobCode');
	const error = useAppSelector(getError);
	const emailVerified = useAppSelector(getEmailVerifiedStatus);

	useEffect(() => {
		if (
			(error === ErrorsEnum.ExpiredCode || error === ErrorsEnum.InvalidCode) &&
			mode === ModeEnum.VerifyEmail &&
			emailVerified
		) {
			navigate(`/${PathsEnum.Register}/${PathsEnum.Success}`);
		}
	}, [error, emailVerified, navigate, mode]);

	useEffect(() => {
		if (oobCode) {
			if (mode === ModeEnum.VerifyEmail) {
				const path = `/${PathsEnum.Register}/${PathsEnum.Success}?oobCode=${oobCode}`;
				verifyCode(applyActionCode, oobCode, path);
			}

			if (mode === ModeEnum.ResetPassword) {
				const path = `/${PathsEnum.ResetPassword}/${PathsEnum.NewPassword}?oobCode=${oobCode}`;
				verifyCode(verifyPasswordResetCode, oobCode, path);
			}
		}
	}, [mode, oobCode, verifyCode]);

	const registerRedirect = () => {
		navigate(`/${PathsEnum.Register}`);
	};

	const resetPasswordRedirect = () => {
		navigate(`/${PathsEnum.ResetPassword}`);
	};

	if (error === ErrorsEnum.ExpiredCode || error === ErrorsEnum.InvalidCode) {
		return (
			<div className='verification-page__wrapper'>
				<h2 className='verification-page__title'>Error!</h2>
				<span className='verification-page__subtitle'>
					Activation code is invalid or link is expired.
				</span>

				{mode === ModeEnum.VerifyEmail && (
					<>
						<p className='verification-page__text'>
							You must verify your email again! Go to Register Page and click
							"Resend Leter"{' '}
						</p>
						<Button variant='primary' onClick={registerRedirect}>
							Go to Register
						</Button>
					</>
				)}
				{mode === ModeEnum.ResetPassword && (
					<>
						<p className='verification-page__text'>
							You must reset your password again!{' '}
						</p>
						<Button variant='primary' onClick={resetPasswordRedirect}>
							Go to Reset
						</Button>
					</>
				)}
			</div>
		);
	}
	return <h2>Redirecting.....</h2>;
};
