import { getAuth, sendEmailVerification } from 'firebase/auth';
import { Verification } from '../../components/common/verification';
import { VerificationEnum } from '../../components/common/verification/verification';
import { Wrapper } from '../../components/common/wrapper';
import { FirebaseError } from 'firebase/app';
import { useDispatch } from 'react-redux';
import { setError } from '../services/user.slice';
import { ErrorsEnum } from '../services/typedef';
import { useAppSelector } from '../../store/hooks';
import {
	getAuthStatus,
	getEmailVerifiedStatus,
	getUser,
} from '../services/selectors';
import { PathsEnum } from '../../App';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const VerificationPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useAppSelector(getUser);
	const verified = useAppSelector(getEmailVerifiedStatus);
	const isAuth = useAppSelector(getAuthStatus);
	const [resendStatus, setResendStatus] = useState(false);

	useEffect(() => {
		if (isAuth === false) {
			navigate(PathsEnum.Home);
		}
	}, [isAuth, navigate]);

	const resendHandle = () => {
		const auth = getAuth();
		const currnetUser = auth.currentUser;

		if (currnetUser) {
			sendEmailVerification(currnetUser, { url: PathsEnum.Host })
				.then(() => {
					setResendStatus(true);
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
				email={user.email}
				resendStatus={resendStatus}
				verified={verified}
				type={VerificationEnum.Register}
				resendHandle={resendHandle}
			/>
		</Wrapper>
	);
};
