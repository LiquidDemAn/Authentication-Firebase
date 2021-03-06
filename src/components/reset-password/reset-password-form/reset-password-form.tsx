import './reset-password-form.scss';
import { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { getError } from '../../../pages/services/selectors';
import { useAppSelector } from '../../../store/hooks';
import { Email } from '../../common/email';

type Props = {
	onSubmit: (event: React.FormEvent<HTMLButtonElement>, email?: string) => void;
};

export const ResetPasswordForm = ({ onSubmit }: Props) => {
	const emailRef = useRef<HTMLInputElement | null>(null);
	const error = useAppSelector(getError);

	return (
		<Form className='reset-password-form'>
			<Email error={error} emailRef={emailRef} />
			<Button
				type='submit'
				variant='success'
				onClick={(event) => onSubmit(event, emailRef?.current?.value)}
			>
				Send
			</Button>
		</Form>
	);
};
