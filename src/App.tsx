import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { HomePage } from './pages/home-page';
import { RegisterPage } from './pages/register-page';
import { LoginPage } from './pages/login-page';
import { useAuth } from './hooks/use-auth';

function App() {
	const navigate = useNavigate();
	const { isAuth } = useAuth();

	useEffect(() => {
		if (isAuth === true) {
			navigate('/');
		}
	}, [isAuth, navigate]);

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
				</Routes>
			)}
		</>
	);
}

export default App;
