import './success-email-verif-page.scss';
import { PathsEnum } from '../../App';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector } from '../../store/hooks';
import { useQuery } from '../../hooks/use-query';
import { getEmailVerifiedStatus } from '../services/selectors';
import { Button } from 'react-bootstrap';

export const SuccessEmailVerifPage = () => {
	const navigate = useNavigate();
	const query = useQuery();
	const emailVerified = useAppSelector(getEmailVerifiedStatus);
	const oobCode = query.get('oobCode');

	useEffect(() => {
		if (!oobCode && !emailVerified) {
			navigate(`/${PathsEnum.Register}`);
		}
	}, [oobCode, emailVerified, navigate]);

	const onClick = () => {
		window.open(`/${PathsEnum.Host}`, '_self');
	};

	return (
		<div className='success-email__wrapper'>
			<h2 className='success-email__title'>Success!</h2>
			<p className='success-emai__text'>Email Successfully verified!</p>
			<Button variant='success' onClick={onClick}>
				Go to Home Page
			</Button>
		</div>
	);
};
