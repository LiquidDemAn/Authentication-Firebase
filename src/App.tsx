import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/home-page';
import { RegisterPage } from './pages/register-page';
import { LoginPage } from './pages/login-page';
import { useAuth } from './hooks/use-auth';
import { VerificationPage } from './pages/verification-page';

function App() {
	const { isAuth, emailVerified } = useAuth();

	// if (isAuth && !emailVerified) {
	// 	return <VerificationPage></VerificationPage>
	// }

	return (
		<>
			{isAuth === null ? (
				<></>
			) : (
				<Routes>
					<Route index element={<HomePage />} />
					<Route path='/' element={<HomePage />} />
					<Route path='/register' element={<RegisterPage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/verification' element={<VerificationPage />} />
				</Routes>
			)}
		</>
	);
}

export default App;
