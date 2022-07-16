import { Button } from 'react-bootstrap';
import { getAuth, signOut } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

export const LogOutButton = () => {
	const auth = getAuth();

	const logOutHandle = () => {
		signOut(auth).catch((error: FirebaseError) => {
			console.error(`LogOut Error: ${error.code}`);
		});
	};

	return (
		<Button variant='danger' onClick={logOutHandle}>
			Log out
		</Button>
	);
};
