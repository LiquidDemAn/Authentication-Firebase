import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getUserEmail } from './../pages/services/selectors';
import { useAppDispatch } from './../store/hooks';
import { setUser } from '../pages/services/user.slice';

export const useAuth = () => {
	const auth = getAuth();
	const dispatch = useAppDispatch();
	const userEmail = useSelector(getUserEmail);
	const [isAuth, setIsAuth] = useState(true);

	onAuthStateChanged(auth, (user) => {
		if (user) {
			user.getIdToken().then((token) => {
				if (!userEmail) {
					dispatch(
						setUser({
							email: user.email,
							id: user.uid,
							token,
						})
					);
				}
			});

			setIsAuth(true);
		} else {
			setIsAuth(false);
		}
	});

	return {
		isAuth,
		email: userEmail,
	};
};
