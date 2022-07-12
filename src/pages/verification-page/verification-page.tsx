import { applyActionCode, getAuth } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PathsEnum } from '../../App';
import { useQuery } from '../../hooks/use-query';
import { Link } from 'react-router-dom';

enum ModeEnum {
	VerifyEmail = 'verifyEmail',
	ResetPassword = 'resetPassword',
}

export const VerificationPage = () => {
	const auth = getAuth();
	const user = auth.currentUser;
	const navigate = useNavigate();
	const query = useQuery();
	const mode = query.get('mode');
	const oobCode = query.get('oobCode');

	console.log(mode);
	console.log(oobCode);

	// useEffect(() => {
	// 	if (mode === ModeEnum.VerifyEmail) {
	// 		navigate(
	// 			`/${PathsEnum.Register}/${PathsEnum.Success}?mode=${ModeEnum.VerifyEmail}&oobCode=${oobCode}`
	// 		);
	// 	}

	// 	if (mode === ModeEnum.ResetPassword) {
	// 		navigate(
	// 			`/${PathsEnum.ResetPassword}/${PathsEnum.NewPassword}?oobCode=${oobCode}`
	// 		);
	// 	}
	// }, [mode, oobCode, navigate]);

	useEffect(() => {
		if (oobCode) {
			if (mode === ModeEnum.VerifyEmail) {
				applyActionCode(auth, oobCode)
					.then(() => {
						navigate(`/${PathsEnum.Register}/${PathsEnum.Success}`);
					})
					.catch((error) => console.log(error));
			}

			if (mode === ModeEnum.ResetPassword) {
				applyActionCode(auth, oobCode)
					.then(() => {
						navigate(
							`/${PathsEnum.ResetPassword}/${PathsEnum.NewPassword}?oobCode=${oobCode}`
						);
					})
					.catch((error) => console.log(error));
			}
		}
	}, [oobCode]);

	// useEffect(() => {
	// 	applyActionCode(auth, oobCode!);
	// 	console.log(user);
	// }, [user]);

	return (
		<div>
			<Link to={PathsEnum.Host}>Home</Link>
		</div>
	);
};
