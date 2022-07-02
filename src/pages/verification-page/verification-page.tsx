import { getAuth, sendEmailVerification } from 'firebase/auth';

export const VerificationPage = () => {
	const auth = getAuth();
	const user = auth.currentUser;

	return <div>{user?.email}</div>;
};
