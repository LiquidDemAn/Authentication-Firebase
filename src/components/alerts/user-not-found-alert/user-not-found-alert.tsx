import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PathsEnum } from '../../../App';

export const UserNotFoundAlert = () => {
	return (
		<Alert variant='warning'>
			User not found! Go to <Link to={`/${PathsEnum.Register}`}>Register</Link>
		</Alert>
	);
};
