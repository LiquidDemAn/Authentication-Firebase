import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getAuthStatus } from './../pages/services/selectors';
import { useAppDispatch, useAppSelector } from './../store/hooks';
import { setAuthStatus, setUser } from '../pages/services/user.slice';

export const useAuth = () => {
	const auth = getAuth();
	const dispatch = useAppDispatch();
	const isAuth = useAppSelector(getAuthStatus);
	console.log(auth.currentUser);

	onAuthStateChanged(auth, (user) => {
		if (user && !isAuth) {
			user.getIdToken().then((token) => {
				dispatch(
					setUser({
						email: user.email,
						id: user.uid,
						emailVerified: user.emailVerified,
						token,
					})
				);
			});
		} else {
			if (isAuth === null) {
				dispatch(setAuthStatus(false));
			}
		}
	});

	return isAuth;
};
