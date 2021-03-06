import { Routes, Route, useNavigate } from 'react-router-dom';
import { HomePage } from './pages/home-page';
import { RegisterPage } from './pages/register-page';
import { LoginPage } from './pages/login-page';
import { useAuth } from './hooks/use-auth';
import { useLocation } from 'react-router-dom';
import { ResetPasswordPage } from './pages/reset-password-page';
import { NewPasswordPage } from './pages/new-password-page';
import { NotFoundPage } from './pages/not-found-page';
import { SuccessEmailVerifPage } from './pages/success-email-verif-page';
import { VerificationPage } from './pages/verification-page';
import { useAppSelector } from './store/hooks';
import { getEmailVerifiedStatus } from './pages/services/selectors';
import { useEffect } from 'react';
import { Wrapper } from './components/common/wrapper';

export enum PathsEnum {
	Host = 'Authentication-Firebase',
	Home = '/',
	Register = 'register',
	ResetPassword = 'reset-password',
	Login = 'login',
	Success = 'success',
	NewPassword = 'new-password',
	Verification = 'verification',
}

function App() {
	const navigate = useNavigate();
	const location = useLocation();
	const emailVerified = useAppSelector(getEmailVerifiedStatus);
	const isAuth = useAuth();

	useEffect(() => {
		if (
			isAuth === false &&
			location.pathname !== `/${PathsEnum.Register}` &&
			location.pathname !== `/${PathsEnum.Verification}` &&
			location.pathname !== `/${PathsEnum.ResetPassword}` &&
			location.pathname !==
				`/${PathsEnum.ResetPassword}/${PathsEnum.NewPassword}`
		) {
			navigate(PathsEnum.Login);
		}

		if (
			location.pathname !== `/${PathsEnum.Verification}` &&
			location.pathname !== `/${PathsEnum.Register}/${PathsEnum.Success}` &&
			isAuth &&
			!emailVerified
		) {
			navigate(PathsEnum.Register);
		}
	}, [isAuth, emailVerified, navigate, location.pathname]);

	return (
		<Wrapper>
			{isAuth === null ? (
				<></>
			) : (
				<Routes>
					<Route path={PathsEnum.Home} element={<HomePage />} />
					<Route path={PathsEnum.Verification} element={<VerificationPage />} />
					<Route path={PathsEnum.Register}>
						<Route index element={<RegisterPage />} />
						<Route
							path={PathsEnum.Success}
							element={<SuccessEmailVerifPage />}
						/>
					</Route>
					<Route path={PathsEnum.Login} element={<LoginPage />} />
					<Route path={PathsEnum.ResetPassword}>
						<Route index element={<ResetPasswordPage />} />
						<Route path={PathsEnum.NewPassword} element={<NewPasswordPage />} />
					</Route>
					<Route path='*' element={<NotFoundPage />} />
				</Routes>
			)}
		</Wrapper>
	);
}

export default App;
