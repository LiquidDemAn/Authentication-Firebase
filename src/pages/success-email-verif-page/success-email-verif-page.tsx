import { PathsEnum } from '../../App';
import { Link } from 'react-router-dom';
import { Wrapper } from '../../components/common/wrapper';
import { getAuth } from 'firebase/auth';
import { useEffect } from 'react';

export const SuccessEmailVerifPage = () => {
	const auth = getAuth();
	const currentUser = auth.currentUser;

	useEffect(() => {
		currentUser?.reload();
	}, [currentUser]);

	return (
		<Wrapper>
			<h3>Success</h3>
			<span>Email Successfully verified!</span>
			<Link to={PathsEnum.Home}>Go to Home Page.</Link>
		</Wrapper>
	);
};
