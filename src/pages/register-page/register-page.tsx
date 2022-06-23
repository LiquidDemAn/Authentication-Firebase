import { Link, useNavigate } from 'react-router-dom';
import { FormComponent } from '../../components/form';
import { useAppDispatch } from '../../store/hooks';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../services/user.slice';

export const RegisterPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleRegister = (email: string, password: string) => {
		const auth = getAuth();
		createUserWithEmailAndPassword(auth, email, password)
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
			<FormComponent
				title='Register'
				formId='register'
				btnName='Sign up'
				handleClick={handleRegister}
			/>

			<p>
				Alreadey have an account? <Link to='/login'>Sign In</Link>
			</p>
		</>
	);
};
