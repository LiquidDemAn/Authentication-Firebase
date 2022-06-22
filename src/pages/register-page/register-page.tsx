import { Link } from 'react-router-dom';
import { Form } from '../../components/form';
import { useAppDispatch } from '../../store/hooks';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../services/user.slice';

export const RegisterPage = () => {
	const dispatch = useAppDispatch();

	const handleLRegister = (email: string, password: string) => {
		const auth = getAuth();
		createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
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

			/* used accessToken with ignore */
			// dispatch(
			// 	setUser({
			// 		email: user.email,
			// 		id: user.uid,
			// 		// @ts-ignore
			// 		token: user.accessToken,
			// 	})
			// );
		});
	};

	return (
		<>
			<h1>Register</h1>

			<Form title='Sign up' handleClick={handleLRegister} />

			<p>
				Alreadey have an account? <Link to='/login'>Sign In</Link>
			</p>
		</>
	);
};
