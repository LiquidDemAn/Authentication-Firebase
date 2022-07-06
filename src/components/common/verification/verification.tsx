import './verification.scss';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getUser } from '../../../pages/services/selectors';
import { useAppSelector } from '../../../store/hooks';
import { LogOutButton } from '../log-out-button';

export enum VerificationEnum {
	Register = 'register',
	ResetPassword = 'reset-password',
}

type Props = {
	verified?: boolean;
	type: VerificationEnum;
	resendHandle: () => void;
};

export const Verification = ({ verified, type, resendHandle }: Props) => {
	const user = useAppSelector(getUser);

	return (
		<div className='verification'>
			<h3 className='verification__title'>Verification</h3>
			<span className='verification__email'>{user.email}</span>
			{verified ? (
				<p className='verification__descriptionn'>
					Email already verified! Go to <Link to='/'>Home!</Link>
				</p>
			) : (
				<>
					<p className='verification__descriptionn'>
						We have sent you a letter to confirm your email. If you did not
						receive the email, please check the "Spam" section or send it again
						by clicking "Resend leter"
					</p>
					<div className='verification__buttons'>
						<Button onClick={resendHandle}>Resend leter</Button>
						{type === VerificationEnum.Register && <LogOutButton />}
					</div>
				</>
			)}
		</div>
	);
};
