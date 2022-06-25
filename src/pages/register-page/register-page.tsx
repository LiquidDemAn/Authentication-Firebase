import { Link, useNavigate } from 'react-router-dom';
import { FormComponent } from '../../components/form';
import { useAppDispatch } from '../../store/hooks';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { setUser } from '../services/user.slice';
import { Wrapper } from '../../components/wrapper';

export const RegisterPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleRegister = (event: React.FormEvent<HTMLButtonElement>, email: string, password: string) => {
		const auth = getAuth();
		event.preventDefault();
		createUserWithEmailAndPassword(auth, email, password)
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
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorMessage);
				console.log(errorCode);
			});
	};

	return (
		<Wrapper>
			<FormComponent
				title='Register'
				formId='register'
				btnName='Sign up'
				handleClick={handleRegister}
			/>

			<p>
				Alreadey have an account? <Link to='/login'>Sign In</Link>
			</p>
		</Wrapper>
	);
};
