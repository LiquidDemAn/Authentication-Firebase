import './form.scss';
import '../../common.scss';
import { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { ErrorsEnum } from '../../pages/services/typedef';
import { Password } from '../password';
import { Email } from '../email';
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

	return (
		<Form>
			{title && <h2 className='form__title'>{title}</h2>}
			<Email error={error} emailRef={emailRef} />
			<Password error={error} passwordRef={passwordRef} />

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
