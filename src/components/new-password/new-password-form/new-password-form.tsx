import './new-password-form.scss';
import { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { getError } from '../../../pages/services/selectors';
import { useAppSelector } from '../../../store/hooks';
import { Password } from '../../common/password';

type Props = {
	onSubmit: (
		event: React.FormEvent<HTMLButtonElement>,
		newPassword: string,
		confirmNewPassword: string
	) => void;
};

export const NewPasswordForm = ({ onSubmit }: Props) => {
	const error = useAppSelector(getError);
	const newPasswordRef = useRef<HTMLInputElement | null>(null);
	const confirmNewPasswordRef = useRef<HTMLInputElement | null>(null);

	return (
		<Form className='new-passsword-form'>
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
			<Button
				onClick={(event) =>
					onSubmit(
						event,
						newPasswordRef.current?.value || '',
						confirmNewPasswordRef.current?.value || ''
					)
				}
				type='submit'
				variant='success'
				className='w-100 p-2'
			>
				Submit
			</Button>
		</Form>
	);
};
