import React from 'react';
import { Link } from 'react-router-dom';
import { PathsEnum } from '../../App';
import { PageTitle } from '../../components/common/page-title';

export const NotFoundPage = () => {
	return (
		<div>
			<PageTitle>Page Not Found!</PageTitle>
			<Link to={PathsEnum.Home}>Go to Home</Link>
		</div>
	);
};
