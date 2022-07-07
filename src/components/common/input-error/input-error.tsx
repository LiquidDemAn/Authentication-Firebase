import './input-error.scss';

type Props = {
	children: string | number;
	className?: string;
};

export const InputError = ({ children, className }: Props) => {
	return (
		<span className={`input-error ${className ? className : ''}`}>
			{children}
		</span>
	);
};
