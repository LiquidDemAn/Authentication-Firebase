import './auth-form.scss';
import '../../../common.scss';
import { useEffect, useRef } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { ErrorsEnum } from '../../../pages/services/typedef';
import { Password } from '../password';
import { Email } from '../email';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../store/hooks';
import { setError } from '../../../pages/services/user.slice';
import { PathsEnum } from '../../../App';

export enum AuthFormIdEnum {
	Login = 'login',
	Register = 'register',
}

type Props = {
	formId: AuthFormIdEnum;
	title?: string;
	btnName: string;
	error: null | ErrorsEnum;
	handleClick: (
		event: React.FormEvent<HTMLButtonElement>,
		email: string,
		password: string
	) => void;
};

export const AuthForm = ({
	formId,
	title,
	btnName,
	error,
	handleClick,
}: Props) => {
	const dispatch = useAppDispatch();
	const emailRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		return () => {
			dispatch(setError(null));
		};
	}, [dispatch]);

	return (
		<Form id={formId}>
			{error === ErrorsEnum.UserNotFoundError && (
				<Alert variant='warning'>
					User not found! Go to <Link to={PathsEnum.Register}>Register</Link>
				</Alert>
			)}

			{title && <h2 className='auth-form__title'>{title}</h2>}
			<Email error={error} emailRef={emailRef} />
			<Password error={error} passwordRef={passwordRef} />
			{formId === AuthFormIdEnum.Login && (
				<Link to={PathsEnum.Home}>Forgot password?</Link>
			)}
			<Button
				type='submit'
				className='auth-form__btn'
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
