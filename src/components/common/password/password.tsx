import './password.scss';
import { MutableRefObject, useState } from 'react';
import { Form } from 'react-bootstrap';
import { IoEyeSharp, IoEyeOffSharp } from 'react-icons/io5';
import { ErrorsEnum } from '../../../pages/services/typedef';
import { InputError } from '../input-error';

type Props = {
	lable?: string;
	error: ErrorsEnum | null;
	passwordRef: MutableRefObject<HTMLInputElement | null>;
};

export const Password = ({ error, passwordRef, lable }: Props) => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<Form.Group>
			<Form.Label>{lable ? lable : 'Password'}</Form.Label>
			<div className='password__input-wrapper'>
				<Form.Control
					autoComplete='on'
					className={
						error === ErrorsEnum.PasswordError ||
						error === ErrorsEnum.InternalError
							? 'border-danger'
							: ''
					}
					type={showPassword ? 'text' : 'password'}
					ref={passwordRef}
					placeholder='Password'
					required
				/>
				{(error === ErrorsEnum.PasswordError ||
					error === ErrorsEnum.InternalError) && (
					<InputError>Wrong Password!</InputError>
				)}
				{showPassword ? (
					<IoEyeOffSharp
						onClick={togglePassword}
						size={20}
						className='password__icon'
					/>
				) : (
					<IoEyeSharp
						onClick={togglePassword}
						size={20}
						className='password__icon'
					/>
				)}
			</div>
		</Form.Group>
	);
};
