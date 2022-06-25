import './home-page.scss';
import { Button } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { Wrapper } from '../../components/wrapper';
import { useAuth } from '../../hooks/use-auth';
import { useAppDispatch } from '../../store/hooks';
import { removeUser } from '../services/user.slice';

export const HomePage = () => {
	const { isAuth, email } = useAuth();
	const dispatch = useAppDispatch();
	const logOut = () => {
		dispatch(removeUser());
	};

	return (
		<Wrapper>
			<div className='home-page__wrapper'>
				<h2 className='home-page__title'>Welcome</h2>

				{isAuth ? (
					<div className='home-page__content'>
						<span className='home-page__email'>{email}</span>
						<Button className='home-page__button' variant='danger' onClick={logOut}>
							Sign out
						</Button>
					</div>
				) : (
					<Navigate to='login' replace />
				)}
			</div>
		</Wrapper>
	);
};
