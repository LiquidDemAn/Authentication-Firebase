import { FormTitle } from '../../components/common/form-title';
import { Wrapper } from '../../components/common/wrapper';
import { NewPasswordForm } from '../../components/new-password/new-password-form';
import { useQuery } from '../../hooks/use-query';
import { confirmPasswordReset, getAuth } from 'firebase/auth';

export const NewPasswordPage = () => {
	const query = useQuery();
	const oobCode = query.get('oobCode');
	const auth = getAuth();

	const onSubmit = (
		newPassword: string | null,
		confirmNewPassword: string | null
	) => {};

	return (
		<Wrapper>
			<FormTitle>Reset Password Confirm</FormTitle>
			<NewPasswordForm />
		</Wrapper>
	);
};
