import { PathsEnum } from '../../App';
import { Link } from 'react-router-dom';
import { Wrapper } from '../../components/common/wrapper';
import { getAuth } from 'firebase/auth';
import { useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { setEmailVerified } from '../services/user.slice';

export const SuccessEmailVerifPage = () => {
	const auth = getAuth();
	const dispatch = useAppDispatch();
	const currentUser = auth.currentUser;
	const emailVerified = currentUser?.emailVerified;

	useEffect(() => {
		if (emailVerified) {
			dispatch(setEmailVerified());
		}
	}, [emailVerified, dispatch]);

	return (
		<Wrapper>
			<h3>Success</h3>
			<span>Email Successfully verified!</span>
			<Link to={PathsEnum.Home}>Go to Home Page.</Link>
		</Wrapper>
	);
};
