import { Link, useNavigate } from 'react-router-dom';
import { FormComponent } from '../../components/form';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { setUser, setError } from '../services/user.slice';
import { Wrapper } from '../../components/wrapper';
import { getError } from '../services/selectors';
import { ErrorsEnum } from '../services/typedef';
import { FirebaseError } from 'firebase/app';

export const RegisterPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const error = useAppSelector(getError);

	const handleRegister = (
		event: React.FormEvent<HTMLButtonElement>,
		email: string,
		password: string
	) => {
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
			.catch((error: FirebaseError) => {
				const errorCode = error.code;
				console.log(errorCode);
				dispatch(setError(errorCode as ErrorsEnum));
			});
	};

	return (
		<Wrapper>
			<FormComponent
				error={error}
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
