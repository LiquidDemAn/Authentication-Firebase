import './form.scss';
import '../../common.scss';
import { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { ErrorsEnum } from '../../pages/services/typedef';
import { Password } from '../password';
import { Email } from '../email';
import { FormAdd } from '../form-add';

type Props = {
	formId: 'login' | 'register';
	title?: string;
	btnName: string;
	error: null | ErrorsEnum;
	handleClick: (
		event: React.FormEvent<HTMLButtonElement>,
		email: string,
		password: string
	) => void
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
		<Form id={formId}>
			{title && <h2 className='form__title'>{title}</h2>}
			<Email error={error} emailRef={emailRef} />
			<Password error={error} passwordRef={passwordRef} />
			{formId === 'login' && <FormAdd />}
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
