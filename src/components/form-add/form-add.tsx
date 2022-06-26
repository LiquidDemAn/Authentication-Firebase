import './form-add.scss';
import { Form } from 'react-bootstrap';

export const FormAdd = () => {
	return (
		<div className='form-add'>
			<Form.Group className='form-add-remember' controlId='formRemeber'>
				<Form.Check type='checkbox' />
				<Form.Label>Remember me</Form.Label>
			</Form.Group>
			<a href='/'>
				Forgot password?
			</a>
		</div>
	);
};
