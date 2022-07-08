import { FormTitle } from '../../components/common/form-title';
import { Wrapper } from '../../components/common/wrapper';
import { NewPasswordForm } from '../../components/new-password/new-password-form';

export const NewPasswordPage = () => {
	return (
		<Wrapper>
			<FormTitle>Reset Password Confirm</FormTitle>
			<NewPasswordForm />
		</Wrapper>
	);
};
