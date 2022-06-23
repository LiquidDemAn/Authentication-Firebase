import './form.scss';
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
			{title && <h2 className='form__title'>{title}</h2>}

			<Form.Group className='form-group' controlId='formEmail'>
				<Form.Label>Email address</Form.Label>
				<Form.Control
					className='form-group__control'
					type='email'
					ref={emailRef}
					placeholder='Enter email'
					required
				/>
			</Form.Group>
			<Form.Group className='form-group' controlId='formPassword'>
				<Form.Label>Password</Form.Label>
				<Form.Control
					className='form-group__control'
					type='password'
					ref={passwordRef}
					placeholder='Password'
					required
				/>
			</Form.Group>

			{formId === 'login' && (
				<div className='form-settings'>
					<Form.Group
						className='form-settings__remember'
						controlId='formRemeber'
					>
						<Form.Check type='checkbox' />
						<Form.Label>Remember me</Form.Label>
					</Form.Group>
					<a className='form-settings__forgot' href='/'>
						Forgot password?
					</a>
				</div>
			)}

			<Button
				className='form__btn'
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
