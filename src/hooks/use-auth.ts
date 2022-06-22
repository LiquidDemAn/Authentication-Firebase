import { getUser } from '../pages/services/selectors';
import { useAppSelector } from './../store/hooks';

export const useAuth = () => {
	const { email, id, token } = useAppSelector(getUser);

	return {
		isAuth: !!email,
		email,
		token,
		id,
	};
};
