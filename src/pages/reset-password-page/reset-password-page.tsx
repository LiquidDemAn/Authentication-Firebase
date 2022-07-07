import { FirebaseError } from 'firebase/app';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { Wrapper } from '../../components/common/wrapper';
import { ResetPasswordForm } from '../../components/reset-password/reset-password-form';
import { ErrorsEnum } from '../services/typedef';
import { setError } from '../services/user.slice';

export const ResetPasswordPage = () => {
	const dispatch = useDispatch();

	const sendHandle = (
		event: React.FormEvent<HTMLButtonElement>,
		email?: string
	) => {
		event.preventDefault();
		const auth = getAuth();

		if (email) {
			sendPasswordResetEmail(auth, email)
				.then((response) => console.log(response))
				.catch((error: FirebaseError) => {
					const errorCode = error.code;
					console.log(errorCode);
					dispatch(setError(errorCode as ErrorsEnum));
				});
		}
	};

	return (
		<Wrapper>
			<ResetPasswordForm onClick={sendHandle} />
		</Wrapper>
	);
};
