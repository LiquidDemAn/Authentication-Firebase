import './App.css';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/home-page';
import { RegisterPage } from './pages/register-page';
import { LoginPage } from './pages/login-page';

function App() {
	return (
		<Routes>
			<Route index element={<HomePage />} />
			<Route path='/' element={<HomePage />} />
			<Route path='/register' element={<RegisterPage />} />
			<Route path='/login' element={<LoginPage />} />
		</Routes>
	);
}

export default App;
