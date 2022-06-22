import { useRef } from 'react';

type Props = {
	title: 'string';
	handleClick: () => void;
};

export const Form = ({ title, handleClick }: Props) => {
	const emailRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);

	return (
		<div>
			<input type='email' ref={emailRef} placeholder='email' required />
			<input
				type='password'
				ref={passwordRef}
				placeholder='password'
				required
			/>
			<button onClick={handleClick}>{title}</button>
		</div>
	);
};
