import { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { getError } from '../../../pages/services/selectors';
import { useAppSelector } from '../../../store/hooks';
import { Password } from '../../common/password';

export const NewPasswordForm = () => {
	const error = useAppSelector(getError);
	const newPasswordRef = useRef(null);
	const confirmNewPasswordRef = useRef(null);

	return (
		<Form>
			<Password
				error={error}
				passwordRef={newPasswordRef}
				lable='New password'
			/>
			<Password
				error={error}
				passwordRef={confirmNewPasswordRef}
				lable='Confirm new password'
			/>
			<Button type='submit' variant='success' className='w-100 p-2'>
				Submit
			</Button>
		</Form>
	);
};
