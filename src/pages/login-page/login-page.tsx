import { Link, useNavigate } from 'react-router-dom';
import { FormComponent } from '../../components/form';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { setError, setUser } from '../services/user.slice';
import { Wrapper } from '../../components/wrapper';
import { ErrorsEnum } from '../services/typedef';
import { getError } from '../services/selectors';
import { FirebaseError } from 'firebase/app';
import { AuthFormIdEnum } from '../../components/form/form';

export const LoginPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const error = useAppSelector(getError);

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
				formId={AuthFormIdEnum.Login}
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
