import './form.scss';
import { useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { IoEyeSharp, IoEyeOffSharp } from 'react-icons/io5';
import { ErrorsEnum } from '../../pages/services/typedef';
type Props = {
	formId: 'login' | 'register';
	title?: string;
	btnName: string;
	error: null | ErrorsEnum;
	handleClick: (
		event: React.FormEvent<HTMLButtonElement>,
		email: string,
		password: string
	) => void;
};

export const FormComponent = ({
	formId,
	title,
	btnName,
	error,
	handleClick,
}: Props) => {
	const emailRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);
	const [showPassword, setShowPassword] = useState(false);

	const togglePassword = () => {
		setShowPassword(!showPassword);
	};

	console.log(error);

	return (
		<Form>
			{title && <h2 className='form__title'>{title}</h2>}

			<Form.Group className='form-group' controlId='formEmail'>
				<Form.Label>Email address</Form.Label>
				<Form.Control
					// className='form-group__control'
					className={`form-group__control ${
						error === ErrorsEnum.EmailError && 'form-group__control_border-red'
					}`}
					type='email'
					ref={emailRef}
					placeholder='Enter email'
					required
				/>
				{error === ErrorsEnum.EmailError && (
					<span className='form-group__error-text'>Wrong Email!</span>
				)}
			</Form.Group>
			<Form.Group className='form-group form-password' controlId='formPassword'>
				<Form.Label>Password</Form.Label>
				<div className='form-password__input-wrapper'>
					<Form.Control
						autoComplete='on'
						className={`form-group__control 
						${
							(error === ErrorsEnum.PasswordError ||
								error === ErrorsEnum.InternalError) &&
							'form-group__control_border-red'
						}
						`}
						type={showPassword ? 'text' : 'password'}
						ref={passwordRef}
						placeholder='Password'
						required
					/>
					{(error === ErrorsEnum.PasswordError ||
						error === ErrorsEnum.InternalError) && (
						<span className='form-group__error-text'>Wrong Password!</span>
					)}
					{showPassword ? (
						<IoEyeOffSharp
							onClick={togglePassword}
							size={20}
							className='form-password__icon'
						/>
					) : (
						<IoEyeSharp
							onClick={togglePassword}
							size={20}
							className='form-password__icon'
						/>
					)}
				</div>
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
				type='submit'
				className='form__btn'
				variant='success'
				onClick={(event) =>
					handleClick(
						event,
						emailRef.current!.value,
						passwordRef.current!.value
					)
				}
			>
				{btnName}
			</Button>
		</Form>
	);
};
