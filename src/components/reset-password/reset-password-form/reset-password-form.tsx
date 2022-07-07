import { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { getError } from '../../../pages/services/selectors';
import { useAppSelector } from '../../../store/hooks';
import { Email } from '../../common/email';
import { FormTitle } from '../../common/form-title';

type Props = {
	onClick: (event: React.FormEvent<HTMLButtonElement>, email?: string) => void;
};

export const ResetPasswordForm = ({ onClick }: Props) => {
	const emailRef = useRef<HTMLInputElement | null>(null);
	const error = useAppSelector(getError);

	return (
		<Form>
			<FormTitle>Reset Password</FormTitle>
			<Email error={error} emailRef={emailRef} />
			<Button
				type='submit'
				variant='primary'
				onClick={(event) => onClick(event, emailRef?.current?.value)}
			>
				Send
			</Button>
		</Form>
	);
};
