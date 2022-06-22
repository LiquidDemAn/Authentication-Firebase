import { Link } from 'react-router-dom';
import { Form } from '../../components/form';
import { useAppDispatch } from '../../store/hooks';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export const LoginPage = () => {
	const dispatch = useAppDispatch();

	const handleLogin = (email: string, password: string) => {
		const auth = getAuth();
		signInWithEmailAndPassword(auth, email, password)
			.then(console.log)
	}

	return (
		<>
			<h1>Login</h1>

			<Form title='Sign in' handleClick={handleLogin}/>

			<p>
				Or <Link to='/register'>register</Link>
			</p>
		</>
	);
};
