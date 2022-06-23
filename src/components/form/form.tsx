import { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';

type Props = {
	formId: 'login' | 'register';
	title?: string;
	btnName: string;
	handleClick: (email: string, password: string) => void;
};

export const FormComponent = ({
	formId,
	title,
	btnName,
	handleClick,
}: Props) => {
	const emailRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);

	return (
		<Form>
			{title && <h2 className='fw-bold fs-30 mb-4'>{title}</h2>}

			<Form.Group className='mb-3' controlId='formEmail'>
				<Form.Label>Email address</Form.Label>
				<Form.Control
					className='p-2'
					type='email'
					ref={emailRef}
					placeholder='Enter email'
					required
				/>
			</Form.Group>
			<Form.Group className='mb-3' controlId='formPassword'>
				<Form.Label>Password</Form.Label>
				<Form.Control
					className='p-2'
					type='password'
					ref={passwordRef}
					placeholder='Password'
					required
				/>
			</Form.Group>

			{formId === 'login' && (
				<div className='d-flex justify-content-between mt-3 mb-3'>
					<Form.Group
						className='d-flex cursor-pointer gap-2'
						controlId='formRemeber'
					>
						<Form.Check type='checkbox' />
						<Form.Label>Remember me</Form.Label>
					</Form.Group>
					<a href='/'>Forgot password?</a>
				</div>
			)}

			<Button
				className='w-100 mb-4'
				variant='success'
				onClick={() =>
					handleClick(emailRef.current!.value, passwordRef.current!.value)
				}
			>
				{btnName}
			</Button>
		</Form>
	);
};
