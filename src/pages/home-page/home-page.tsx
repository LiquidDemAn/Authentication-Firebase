import { Navigate } from 'react-router-dom';
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
		<>
			<h1>home-page</h1>

			{isAuth ? (
				<p>
					Welcome {email} <button onClick={logOut}>Sign out</button>
				</p>
			) : (
				<Navigate to='login' replace />
			)}
		</>
	);
};
