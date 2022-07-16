import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PathsEnum } from '../../../App';

export const ResetPassCodeUsedAlert = () => {
	return (
		<Alert variant='danger'>
			This link has already been used to change your password. If you forgot
			your password, go to the{' '}
			<Link to={`/${PathsEnum.ResetPassword}`}>Reset page</Link>
		</Alert>
	);
};
