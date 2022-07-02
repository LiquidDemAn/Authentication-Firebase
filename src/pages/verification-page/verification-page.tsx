import { useEffect } from 'react';
import { getAuth, sendEmailVerification } from 'firebase/auth';
import { Verification } from '../../components/verification';
import { VerificationEnum } from '../../components/verification/verification';
import { Wrapper } from '../../components/wrapper';
import { FirebaseError } from 'firebase/app';
import { useDispatch } from 'react-redux';
import { setError } from '../services/user.slice';
import { ErrorsEnum } from '../services/typedef';
import { useAppSelector } from '../../store/hooks';
import { getAuthStatus, getEmailVerifiedStatus } from '../services/selectors';
import { useNavigate } from 'react-router-dom';

export const VerificationPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const auth = getAuth();
	const user = auth.currentUser;
	const isAuth = useAppSelector(getAuthStatus);
	const verified = useAppSelector(getEmailVerifiedStatus);

	useEffect(() => {
		if (isAuth === false) {
			navigate('/login');
		}
	}, [isAuth, navigate]);

	const resendHandle = () => {
		if (user) {
			sendEmailVerification(user, { url: 'http://localhost:3000/' })
				.then(() => {
					document.location.reload();
				})
				.catch((error: FirebaseError) => {
					const errorCode = error.code;
					console.log(errorCode);
					dispatch(setError(errorCode as ErrorsEnum));
				});
		}
	};

	return (
		<Wrapper>
			<Verification
				verified={verified}
				type={VerificationEnum.Register}
				resendHandle={resendHandle}
			/>
		</Wrapper>
	);
};
