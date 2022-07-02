import { getAuth, sendEmailVerification } from 'firebase/auth';
import { Verification } from '../../components/verification';
import { Wrapper } from '../../components/wrapper';

export const VerificationPage = () => {
	const auth = getAuth();
	const user = auth.currentUser;

	return (
		<Wrapper>
			<Verification />
		</Wrapper>
	);
};
