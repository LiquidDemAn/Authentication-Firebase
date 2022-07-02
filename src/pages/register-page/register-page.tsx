import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { FormComponent } from '../../components/form';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
	getAuth,
	createUserWithEmailAndPassword,
	sendEmailVerification,
} from 'firebase/auth';
import { setUser, setError } from '../services/user.slice';
import { Wrapper } from '../../components/wrapper';
import { getAuthStatus, getError } from '../services/selectors';
import { ErrorsEnum } from '../services/typedef';
import { AuthFormIdEnum } from '../../components/form/form';
import { useEffect } from 'react';

export const RegisterPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const error = useAppSelector(getError);
	const isAuth = useAppSelector(getAuthStatus);

	useEffect(() => {
		if (isAuth === true) {
			navigate('/');
		}
	}, [isAuth, navigate]);

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
							emailVerified: user.emailVerified,
							token,
						})
					);
				});

				sendEmailVerification(user, { url: 'http://localhost:3000/' })
					.then(() => {
						console.log('success');
						navigate('/verification');
					})
					.catch((error: FirebaseError) => {
						const errorCode = error.code;
						console.log(errorCode);
						dispatch(setError(errorCode as ErrorsEnum));
					});
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
				formId={AuthFormIdEnum.Register}
				btnName='Sign up'
				handleClick={handleRegister}
			/>

			<p>
				Alreadey have an account? <Link to='/login'>Sign In</Link>
			</p>
		</Wrapper>
	);
};
