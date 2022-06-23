import { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';

type Props = {
	title: string;
	handleClick: (email: string, password: string) => void;
};

export const FormComponent = ({ title, handleClick }: Props) => {
	const emailRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);

	return (
		<Form>
			<input type='email' ref={emailRef} placeholder='email' required />
			<input
				type='password'
				ref={passwordRef}
				placeholder='password'
				required
			/>
			<Button variant='success'
				onClick={() =>
					handleClick(emailRef.current!.value, passwordRef.current!.value)
				}
			>
				{title}
			</Button>
		</Form>
	);
};
