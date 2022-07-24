import './auth-form.scss';
import { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Password } from '../password';
import { Email } from '../email';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import { PathsEnum } from '../../../App';
import { getError } from '../../../pages/services/selectors';
import { IoLogoGoogle } from 'react-icons/io5';
import { useAuthMethods } from '../../../hooks/use-auth-methods';

export enum AuthFormIdEnum {
	Login = 'login-form',
	Register = 'register-form',
}

type Props = {
	formId: AuthFormIdEnum;
	onSubmit: (
		event: React.FormEvent<HTMLButtonElement>,
		email: string,
		password: string
	) => void;
};

export const AuthForm = ({ formId, onSubmit }: Props) => {
	const { signInWithGoogle } = useAuthMethods();
	const error = useAppSelector(getError);
	const emailRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);

	return (
		<Form className='auth-form' id={formId}>
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
					{formId === AuthFormIdEnum.Login && 'Sign in'}
					{formId === AuthFormIdEnum.Register && 'Sign up'}
				</Button>

				<Button
					className='auth-form__google'
					variant='outline-primary'
					onClick={signInWithGoogle}
				>
					<IoLogoGoogle /> Sign in with google
				</Button>
			</div>
		</Form>
	);
};
