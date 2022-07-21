import './google-in-button.scss';
import { Button } from 'react-bootstrap';
import { getAuth } from 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { IoLogoGoogle } from 'react-icons/io5';
import { FirebaseError } from 'firebase/app';
import { useAppDispatch } from '../../../store/hooks';
import { setError } from '../../../pages/services/user.slice';
import { ErrorsEnum } from '../../../pages/services/typedef';

export const GoogleInButton = () => {
	const provider = new GoogleAuthProvider();
	const dispatch = useAppDispatch();

	const onSubmit = () => {
		const auth = getAuth();

		signInWithPopup(auth, provider)
			.catch((error: FirebaseError) => {
				dispatch(setError(error.code as ErrorsEnum));
			});
	};

	return (
		<Button
			className='google-in-button'
			variant='outline-primary'
			onClick={onSubmit}
		>
			<IoLogoGoogle /> Sign in with google
		</Button>
	);
};
