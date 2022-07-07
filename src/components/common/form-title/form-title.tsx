import './form-title.scss';

type Props = {
	children: string | number;
	className?: string;
};

export const FormTitle = ({ children, className }: Props) => {
	return (
		<h2 className={`form-title ${className ? className : ''}`}>{children}</h2>
	);
};
