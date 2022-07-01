import '../../common.scss';
import { MutableRefObject } from 'react';
import { ErrorsEnum } from '../../pages/services/typedef';
import { Form } from 'react-bootstrap';

type Props = {
	error: ErrorsEnum | null;
	emailRef: MutableRefObject<HTMLInputElement | null>;
};

export const Email = ({ error, emailRef }: Props) => {
	return (
		<Form.Group className='form-group' controlId='formEmail'>
			<Form.Label>Email address</Form.Label>
			<Form.Control
				className={`form-group__control ${
					error === ErrorsEnum.EmailError && 'form-group__control_border-red'
				}`}
				type='email'
				ref={emailRef}
				placeholder='Enter email'
				required
			/>
			{error === ErrorsEnum.EmailError && (
				<span className='form-group__error-text'>Wrong Email!</span>
			)}
		</Form.Group>
	);
};
