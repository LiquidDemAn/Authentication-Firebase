import { useEffect } from 'react';
import './home-page.scss';
import { signOut, getAuth } from 'firebase/auth';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Wrapper } from '../../components/wrapper';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { removeUser } from '../services/user.slice';
import { FirebaseError } from 'firebase/app';
import { getAuthStatus } from '../services/selectors';

export const HomePage = () => {
	const isAuth = useAppSelector(getAuthStatus);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const auth = getAuth();

	const logOut = () => {
		signOut(auth)
			.then(() => {
				dispatch(removeUser());
			})
			.catch((error: FirebaseError) => {
				console.error(`LogOut Error: ${error.code}`);
			});
	};

	useEffect(() => {
		if (isAuth === false) {
			navigate('/login');
		}
	}, [isAuth, navigate]);

	return (
		<Wrapper>
			<div className='home-page__wrapper'>
				<h2 className='home-page__title'>Welcome</h2>
				<div className='home-page__content'>
					<span className='home-page__email'>{auth.currentUser?.email}</span>
					<Button
						className='home-page__button'
						variant='danger'
						onClick={logOut}
					>
						Sign out
					</Button>
				</div>
			</div>
		</Wrapper>
	);
};
