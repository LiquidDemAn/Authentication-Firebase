import { Link } from 'react-router-dom';

export const RegisterPage = () => {
	return (
		<>
			<h1>Register</h1>

			<p>
				Alreadey have an account? <Link to='/login'>Sign In</Link>
			</p>
		</>
	);
};
