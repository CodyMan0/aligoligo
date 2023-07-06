import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientOptions } from "./utils/contants";
import HttpClient from "./http/HttpClient";
import AuthServiceImpl from "./services/AuthService";
import { AuthProvider } from "./context/AuthContext";
import TargetServiceImpl from "./services/TargetService";
import { TargetProvider } from "./context/TargetContext";
import { SideBarProvider } from "./context/SideBarContext";
import { routerInfo } from "./utils/router";
import { TokenRepository } from "./repository/tokenRepository";
import { ModalProvider } from "./context/ModalContext";

function App() {
	const queryClient = new QueryClient(QueryClientOptions);

	const tokenRepository = new TokenRepository();

	// const client = new HttpClient(
	// 	import.meta.env.VITE_SERVER_URL,
	// 	tokenRepository
	// ); // 서버 (네트워크)

	const client = new HttpClient(
		import.meta.env.VITE_LOCAL_SERVER_URL,
		tokenRepository
	);

	// const client = new HttpClient("http://localhost:5173/", tokenRepository); // 로컬 목 데이터

	console.log("token", tokenRepository);

	const authService = new AuthServiceImpl(client.httpClient, tokenRepository);
	const targetService = new TargetServiceImpl(client.withToken());
	const routerObject = createBrowserRouter(routerInfo);

	return (
		<>
			<QueryClientProvider client={queryClient}>
				<AuthProvider authService={authService}>
					<TargetProvider targetService={targetService}>
						<SideBarProvider>
							<ModalProvider>
								<main className="phone:w-full desktop:w-desktop desktop:mx-auto bg-white  overflow-auto scroll-smooth">
									<RouterProvider router={routerObject} />
								</main>
							</ModalProvider>
						</SideBarProvider>
					</TargetProvider>
				</AuthProvider>
				<ReactQueryDevtools />
			</QueryClientProvider>
		</>
	);
}

export default App;
