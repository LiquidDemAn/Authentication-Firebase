import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/home-page';
import { RegisterPage } from './pages/register-page';
import { LoginPage } from './pages/login-page';
import { useAuth } from './hooks/use-auth';
import { VerificationPage } from './pages/verification-page';
import { useLocation } from 'react-router-dom';

export enum PathsEnum {
	Home = '/',
	Host = 'http://localhost:3000',
	Register = 'register',
	Login = 'login',
	Verification = 'verification',
}

function App() {
	const location = useLocation();
	const { isAuth, emailVerified } = useAuth();

	if (isAuth === false && location.pathname !== `/${PathsEnum.Register}`) {
		return <LoginPage />;
	}

	if (isAuth && !emailVerified) {
		return <VerificationPage></VerificationPage>;
	}

	return (
		<>
			{isAuth === null ? (
				<></>
			) : (
				<Routes>
					<Route index element={<HomePage />} />
					<Route path={PathsEnum.Register}>
						<Route index element={<RegisterPage />} />
						<Route
							path={PathsEnum.Verification}
							element={<VerificationPage />}
						/>
					</Route>
					<Route path={PathsEnum.Login} element={<LoginPage />} />
				</Routes>
			)}
		</>
	);
}

export default App;
