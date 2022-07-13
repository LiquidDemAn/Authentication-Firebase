import './home-page.scss';
import { useAppSelector } from '../../store/hooks';
import { getUser } from '../services/selectors';
import { LogOutButton } from '../../components/common/log-out-button';

export const HomePage = () => {
	const user = useAppSelector(getUser);

	return (
		<div className='home-page__wrapper'>
			<h2 className='home-page__title'>Welcome</h2>
			<div className='home-page__content'>
				<span className='home-page__email'>{user.email}</span>
				<LogOutButton />
			</div>
		</div>
	);
};
