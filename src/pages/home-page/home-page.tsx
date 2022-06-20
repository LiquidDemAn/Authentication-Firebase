import { Navigate } from 'react-router-dom';

export const HomePage = () => {
	const shouldRedirect = true;

	return (
		<>
			<h1>home-page</h1>
      {shouldRedirect && <Navigate replace to='/login' />}
		</>
	);
};
