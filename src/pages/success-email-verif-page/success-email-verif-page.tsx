import { PathsEnum } from '../../App';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setEmailVerified } from '../services/user.slice';
import { useQuery } from '../../hooks/use-query';
import { getEmailVerifiedStatus } from '../services/selectors';

export const SuccessEmailVerifPage = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const query = useQuery();
	const emailVerified = useAppSelector(getEmailVerifiedStatus);
	const oobCode = query.get('oobCode');

	useEffect(() => {
		if (!oobCode && !emailVerified) {
			navigate(`/${PathsEnum.Register}`);
		} else {
			dispatch(setEmailVerified());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [oobCode]);

	return (
		<>
			<h2>Success</h2>
			<span>Email Successfully verified!</span>
			<Link to={PathsEnum.Home}>Go to Home Page.</Link>
		</>
	);
};
