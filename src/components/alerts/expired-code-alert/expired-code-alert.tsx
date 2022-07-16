import { Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PathsEnum } from '../../../App';

export const ExpiredCodeAlert = () => {
	return (
		<Alert variant='danger'>
			The link has expired! You must confirm your mail again. Go back to{' '}
			<Link to={`/${PathsEnum.ResetPassword}`}>Reset page</Link>
		</Alert>
	);
};
