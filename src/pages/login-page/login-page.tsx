import { Link, useNavigate } from 'react-router-dom';
import { Form } from '../../components/form';
import { useAppDispatch } from '../../store/hooks';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../services/user.slice';

export const LoginPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogin = (email: string, password: string) => {
		const auth = getAuth();
		signInWithEmailAndPassword(auth, email, password)
			.then(({ user }) => {
				/* used getIdToken for get user token */
				user.getIdToken().then((token) => {
					dispatch(
						setUser({
							email: user.email,
							id: user.uid,
							token,
						})
					);
				});
				navigate('/');
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorMessage);
				console.log(errorCode);
			});
	};

	return (
		<>
			<h1>Login</h1>

			<Form title='Sign in' handleClick={handleLogin} />

			<p>
				Or <Link to='/register'>register</Link>
			</p>
		</>
	);
};
