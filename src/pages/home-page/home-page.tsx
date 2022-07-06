import './home-page.scss';
import { PathsEnum } from '../../App';
import { useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Wrapper } from '../../components/wrapper';
import { useAppSelector } from '../../store/hooks';
import { getAuthStatus } from '../services/selectors';
import { LogOutButton } from '../../components/log-out-button';

export const HomePage = () => {
	const isAuth = useAppSelector(getAuthStatus);
	const navigate = useNavigate();
	const auth = getAuth();

	useEffect(() => {
		if (isAuth === false) {
			navigate(`${PathsEnum.Login}`);
		}
	}, [isAuth, navigate]);

	return (
		<Wrapper>
			<div className='home-page__wrapper'>
				<h2 className='home-page__title'>Welcome</h2>
				<div className='home-page__content'>
					<span className='home-page__email'>{auth.currentUser?.email}</span>
					<LogOutButton />
				</div>
			</div>
		</Wrapper>
	);
};
