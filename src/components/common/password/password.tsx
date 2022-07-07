import './password.scss';
import '../../../common.scss';
import { MutableRefObject, useState } from 'react';
import { Form } from 'react-bootstrap';
import { IoEyeSharp, IoEyeOffSharp } from 'react-icons/io5';
import { ErrorsEnum } from '../../../pages/services/typedef';

type Props = {
	error: ErrorsEnum | null;
	passwordRef: MutableRefObject<HTMLInputElement | null>;
};

export const Password = ({ error, passwordRef }: Props) => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<Form.Group className='form-group'>
			<Form.Label>Password</Form.Label>
			<div className='password__input-wrapper'>
				<Form.Control
					autoComplete='on'
					className={
						error === ErrorsEnum.PasswordError ||
						error === ErrorsEnum.InternalError
							? 'form-group__control_border-red'
							: ' '
					}
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
