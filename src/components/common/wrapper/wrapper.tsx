import { ReactElement } from 'react';
import './wrapper.scss';

type Props = {
	children: ReactElement | ReactElement[];
};

export const Wrapper = ({ children }: Props) => {
	return (
		<div className='wrapper'>
			<div className='wrapper__image'></div>
			<div className='wrapper__content'>{children}</div>
		</div>
	);
};
