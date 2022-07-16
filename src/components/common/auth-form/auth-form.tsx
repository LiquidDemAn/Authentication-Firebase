import './auth-form.scss';
import { useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Password } from '../password';
import { Email } from '../email';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setError } from '../../../pages/services/user.slice';
import { PathsEnum } from '../../../App';
import { getError } from '../../../pages/services/selectors';
import { FormTitle } from '../form-title';

export enum AuthFormIdEnum {
	Login = 'login-form',
	Register = 'register-form',
}

type Props = {
	formId: AuthFormIdEnum;
	title?: string;
	btnName: string;
	onSubmit: (
		event: React.FormEvent<HTMLButtonElement>,
		email: string,
		password: string
	) => void;
};

export const AuthForm = ({ formId, title, btnName, onSubmit }: Props) => {
	const dispatch = useAppDispatch();
	const emailRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);
	const error = useAppSelector(getError);

	useEffect(() => {
		return () => {
			dispatch(setError(null));
		};
	}, [dispatch]);

	return (
		<Form className='auth-form' id={formId}>
			{title && <FormTitle>{title}</FormTitle>}

			<div className='auth-form__content'>
				<Email error={error} emailRef={emailRef} />
				<Password error={error} passwordRef={passwordRef} />

				{formId === AuthFormIdEnum.Login && (
					<Link to={`/${PathsEnum.ResetPassword}`}>Forgot password?</Link>
				)}

				<Button
					type='submit'
					className='p-2 w-100'
					variant='success'
					onClick={(event) =>
						onSubmit(event, emailRef.current!.value, passwordRef.current!.value)
					}
				>
					{btnName}
				</Button>
			</div>
		</Form>
	);
};
