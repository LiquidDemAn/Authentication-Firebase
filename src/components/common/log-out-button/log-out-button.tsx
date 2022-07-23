import { Button } from 'react-bootstrap';
import { getAuth, signOut } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { useAppDispatch } from '../../../store/hooks';
import { setError } from '../../../pages/services/user.slice';
import { ErrorsEnum } from '../../../pages/services/typedef';

export const LogOutButton = () => {
	const auth = getAuth();
	const dispatch = useAppDispatch();

	const logOutHandle = () => {
		signOut(auth).catch((error: FirebaseError) => {
			dispatch(setError(error.code as ErrorsEnum));
		});
	};

	return (
		<Button variant='danger' onClick={logOutHandle}>
			Log out
		</Button>
	);
};
