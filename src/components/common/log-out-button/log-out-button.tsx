import { Button } from 'react-bootstrap';
import { getAuth, signOut } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { useAppDispatch } from '../../../store/hooks';
import { removeUser } from '../../../pages/services/user.slice';

export const LogOutButton = () => {
	const dispatch = useAppDispatch();
	const auth = getAuth();

	const logOutHandle = () => {
		signOut(auth)
			.then(() => {
				dispatch(removeUser());
			})
			.catch((error: FirebaseError) => {
				console.error(`LogOut Error: ${error.code}`);
			});
	};

	return (
		<Button variant='danger' onClick={logOutHandle}>
			Log out
		</Button>
	);
};
