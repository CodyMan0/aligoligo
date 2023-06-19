import { Link } from "react-router-dom";
import kakaoLogo from "../../assets/kakao/kakao_login_medium_wide.png";

const OAuth = () => {
	const APP_KEY = import.meta.env.VITE_KAKAO_CLIENT_ID;
	const REDIRECT_URL = "http://localhost:5173/kakao";
	const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${APP_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`;
	console.log(APP_KEY, REDIRECT_URL);
	return (
		<Link to={KAKAO_AUTH_URI} className="block mt-10 ">
			<img src={kakaoLogo} alt="카카오버튼" className="rounded-xl" />
		</Link>
	);
};

export default OAuth;
