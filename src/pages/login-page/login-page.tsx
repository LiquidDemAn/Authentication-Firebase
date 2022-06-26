import { Link, useNavigate } from 'react-router-dom';
import { FormComponent } from '../../components/form';
import { useAppDispatch } from '../../store/hooks';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { setError, setUser } from '../services/user.slice';
import { Wrapper } from '../../components/wrapper';
import { ErrorsEnum } from '../services/typedef';

export const LoginPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogin = (
		event: React.FormEvent<HTMLButtonElement>,
		email: string,
		password: string
	) => {
		const auth = getAuth();
		event.preventDefault();

		signInWithEmailAndPassword(auth, email, password)
			.then(({ user }) => {
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
				const errorCode: ErrorsEnum = error.code;
				console.log(errorCode);
				dispatch(setError(errorCode));
			});
	};

	return (
		<Wrapper>
			<FormComponent
				formId='login'
				title='Login to your account'
				btnName='Login now'
				handleClick={handleLogin}
			/>
			<span>
				Don't have an account? <Link to='/register'>Sign Up</Link>
			</span>
		</Wrapper>
	);
};
