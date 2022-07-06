import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { FormComponent } from '../../components/form';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
	getAuth,
	createUserWithEmailAndPassword,
	sendEmailVerification,
} from 'firebase/auth';
import { setError } from '../services/user.slice';
import { Wrapper } from '../../components/wrapper';
import { getAuthStatus, getError } from '../services/selectors';
import { ErrorsEnum } from '../services/typedef';
import { AuthFormIdEnum } from '../../components/form/form';
import { useEffect } from 'react';
import { PathsEnum } from '../../App';

export const RegisterPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const error = useAppSelector(getError);
	const isAuth = useAppSelector(getAuthStatus);

	useEffect(() => {
		if (isAuth === true) {
			navigate(`${PathsEnum.Home}`);
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
				sendEmailVerification(user, { url: PathsEnum.Host })
					.then(() => {
						console.log('success');
						navigate(PathsEnum.Verification);
					})
					.catch((error: FirebaseError) => {
						console.log(error.code);
						dispatch(setError(error.code as ErrorsEnum));
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
