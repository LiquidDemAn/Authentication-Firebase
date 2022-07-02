import { getUser } from '../../pages/services/selectors';
import { useAppSelector } from '../../store/hooks';
import './verification.scss';

export const Verification = () => {
	const user = useAppSelector(getUser);

	return (
		<div className='verification'>
			<h3 className='verification__title'>Verification</h3>
			<span className='verification__email'>{user.email}</span>
			<p className='verification__descriptionn'>
				We have sent you an email to confirm your email. If you did not receive
				the email, please check the "Spam" section or send it again by clicking
				here
			</p>
		</div>
	);
};
