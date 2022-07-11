import './verification.scss';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { LogOutButton } from '../log-out-button';
import { PathsEnum } from '../../../App';

export enum VerificationEnum {
	Register = 'register',
	ResetPassword = 'reset-password',
}

type Props = {
	type: VerificationEnum;
	resendHandle: () => void;
	email: string | null;
	resendStatus: boolean;
	verified?: boolean;
};

export const Verification = ({
	verified,
	type,
	resendHandle,
	email,
	resendStatus,
}: Props) => {
	const navigate = useNavigate();

	return (
		<div className='verification'>
			<h3 className='verification__title'>Verification</h3>
			<span className='verification__email'>{email}</span>
			{verified ? (
				<p>
					Email already verified! Go to <Link to='/'>Home!</Link>
				</p>
			) : (
				<>
					<p>
						We have sent you a letter to confirm your email. If you did not
						receive the email, please check the "Spam" section or send it again
						by clicking "Resend leter"
					</p>
					<div className='verification__buttons'>
						{!resendStatus && (
							<Button onClick={resendHandle}>Resend leter</Button>
						)}
						{type === VerificationEnum.Register && <LogOutButton />}
						{type === VerificationEnum.ResetPassword && (
							<Button onClick={() => navigate(`/${PathsEnum.Login}`)}>
								Go to Login
							</Button>
						)}
					</div>
				</>
			)}
		</div>
	);
};
