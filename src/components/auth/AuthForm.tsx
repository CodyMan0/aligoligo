import { useReducer, useState } from "react";
import { ActionType, UserInfoType } from "../../types/AuthType";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthInput from "./AuthInput";
import Warnning from "./Warning";
import { useAuthService } from "../../hooks/useAuth";

import {
	EMAIL_INPUT,
	NICKNAME_INPUT,
	PASSWORD_INPUT,
	ValidationAuth,
} from "../../utils/contants";
import OAuth from "./OAuth";
import AuthValidation from "./AuthValidation";

const ACTION_CONST = {
	SET_EMAIL: "SET_EMAIL",
	SET_PASSWORD: "SET_PASSWORD",
	SET_NICKNAME: "SET_NICKNAME",
} as const;

const authReducer = (state: UserInfoType, action: ActionType) => {
	switch (action.type) {
		case ACTION_CONST.SET_EMAIL: {
			const email = action.data;
			const emailValid = email.includes("@") && email.length >= 3;

			return { ...state, email, emailValid };
		}
		case ACTION_CONST.SET_PASSWORD: {
			const password = action.data;
			const passwordValid = password.length >= 9;
			return { ...state, password, passwordValid };
		}
		case ACTION_CONST.SET_NICKNAME: {
			const nickName = action.data;
			const nickNameValid = nickName.length >= 3 && nickName.length < 11;
			return { ...state, nickName, nickNameValid };
		}
		default:
			throw new Error("Unknown Action");
	}
};

const initialState: UserInfoType = {
	email: "",
	password: "",
	nickName: "",
	emailValid: true,
	passwordValid: true,
	nickNameValid: true,
};
interface AuthFormProps {
	name: string;
	isLogin: boolean;
	url: string;
}

export default function AuthForm({ name, isLogin, url }: AuthFormProps) {
	const [message, setMessage] = useState("");
	const [userInfo, dispatch] = useReducer(authReducer, initialState);
	const { emailValid, passwordValid, nickNameValid } = userInfo;
	const authService = useAuthService();
	const navigate = useNavigate();

	const isActive = isLogin
		? !emailValid || !passwordValid
		: !emailValid || !passwordValid || !nickNameValid;

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isLogin) {
			authService
				?.signIn(userInfo)
				.then((data) => {
					if ("accessToken" in data) {
						localStorage.setItem("accessToken", data.accessToken);
						localStorage.setItem("userNickName", data.user.nickName.toString());
						navigate("/target");
					}
				})
				.catch((error) => setMessage(error.signInMessage));
		} else {
			authService
				?.signUp(userInfo)
				.then((data) => {
					console.log("authFormSignUp", data);
					if ("accessToken" in data) {
						setMessage("성공했습니다");
						navigate("/target");
					}
				})
				.catch((error) => setMessage(error.signUpMessage));
		}
	};
	return (
		<>
			<div className="flex text-main items-center mb-8 p-3">
				<h1 className=" text-4xl">{name}</h1>
			</div>
			<form
				action="submit"
				onSubmit={handleSubmit}
				className="flex flex-col w-2/3 bg-white rounded-md"
			>
				<section className="px-5">
					<div className="mb-8">
						<AuthInput
							name={EMAIL_INPUT.name}
							text={userInfo.email}
							placeholder={EMAIL_INPUT.placeholder}
							userInfo={userInfo}
							dispatch={dispatch}
						/>
						{!emailValid && (
							<AuthValidation>{ValidationAuth.email}</AuthValidation>
						)}
					</div>
					<div className="mb-8">
						<AuthInput
							name={PASSWORD_INPUT.name}
							text={userInfo.password}
							placeholder={PASSWORD_INPUT.placeholder}
							userInfo={userInfo}
							dispatch={dispatch}
						/>
						{!passwordValid && (
							<AuthValidation>{ValidationAuth.password}</AuthValidation>
						)}
					</div>
					{!isLogin && (
						<div className="mb-8">
							<AuthInput
								name={NICKNAME_INPUT.name}
								text={userInfo.nickName}
								placeholder={NICKNAME_INPUT.placeholder}
								userInfo={userInfo}
								dispatch={dispatch}
							/>
							{!nickNameValid && (
								<AuthValidation>{ValidationAuth.nickName}</AuthValidation>
							)}
						</div>
					)}
					//이부분 공통
					<button
						className={`w-full text-xl ${
							isActive ? "bg-mainHover" : "bg-main"
						}  px-10 py-2 mt-4 text-white rounded-xl hover:bg-mainHover ease-in duration-100`}
						type="submit"
						disabled={isActive}
					>
						{name}
					</button>
					<OAuth />
				</section>

				<Link
					to={url}
					className="text-sm text-mainHover self-center mt-8 hover:text-main ease-in duration-100"
				>
					<span>{isLogin ? "회원가입" : "로그인"}하러 가기</span>
				</Link>
				{message && <Warnning message={message} />}
			</form>
		</>
	);
}
