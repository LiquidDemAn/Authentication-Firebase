import { MutableRefObject } from 'react';
import { ErrorsEnum } from '../../../pages/services/typedef';
import { Form } from 'react-bootstrap';
import { InputError } from '../input-error';

type Props = {
	error: ErrorsEnum | null;
	emailRef: MutableRefObject<HTMLInputElement | null>;
};

export const Email = ({ error, emailRef }: Props) => {
	return (
		<Form.Group>
			<Form.Label>Email address</Form.Label>
			<Form.Control
				className={error === ErrorsEnum.EmailError ? 'border-danger' : ''}
				type='email'
				ref={emailRef}
				placeholder='Enter email'
				required
			/>
			{error === ErrorsEnum.EmailError && <InputError>Wrong Email!</InputError>}
		</Form.Group>
	);
};
