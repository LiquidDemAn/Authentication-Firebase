import { PathsEnum } from '../../App';
import { Link } from 'react-router-dom';
import { Wrapper } from '../../components/common/wrapper';

export const SuccessEmailVerifPage = () => {
	return (
		<Wrapper>
			<h3>Success</h3>
			<span>Email Successfully verified!</span>
			<Link to={PathsEnum.Home}>Go to Home Page.</Link>
		</Wrapper>
	);
};
