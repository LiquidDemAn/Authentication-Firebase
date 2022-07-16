import './page-title.scss';

type Props = {
	children: string | number;
	className?: string;
};

export const PageTitle = ({ children, className }: Props) => {
	return (
		<h2 className={`form-title ${className ? className : ''}`}>{children}</h2>
	);
};
