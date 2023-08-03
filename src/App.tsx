import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientOptions } from "./utils/constant/contants";
import HttpClient from "./http/HttpClient";
import AuthServiceImpl from "./services/AuthService";
import { AuthProvider } from "./context/AuthContext";
import TargetServiceImpl from "./services/TargetService";
import { TargetProvider } from "./context/TargetContext";
import { SideBarProvider } from "./context/SideBarContext";
import { routerInfo } from "./utils/router";
import { TokenRepository } from "./repository/tokenRepository";
import { ModalProvider } from "./context/ModalContext";
import { GuestProvider } from "./context/GuestContext";
import GuestServiceImpl from "./services/GuestService";
import { CheckModalProvider } from "./context/CheckModalContext";
import { HelmetProvider } from "react-helmet-async";
import { domMax, LazyMotion } from "framer-motion";

function App() {
	const queryClient = new QueryClient(QueryClientOptions);
	const tokenRepository = new TokenRepository();
	const client = new HttpClient(
		import.meta.env.VITE_SERVER_URL,
		tokenRepository
	);

	// 의존성 주입 인젝터라는 것이 상황에 따라 다른 의존성 넣으주려고 사용한다.
	const authService = new AuthServiceImpl(client.httpClient, tokenRepository);
	const targetService = new TargetServiceImpl(client.withToken());
	const guestService = new GuestServiceImpl(client.withoutToken());
	const routerObject = createBrowserRouter(routerInfo);

	return (
		<QueryClientProvider client={queryClient}>
			<GuestProvider guestService={guestService}>
				<AuthProvider authService={authService}>
					<TargetProvider targetService={targetService}>
						<SideBarProvider>
							<ModalProvider>
								<CheckModalProvider>
									<LazyMotion features={domMax}>
										<HelmetProvider>
											<main className="phone:w-full desktop:w-desktop desktop:mx-auto bg-white min-h-screen overflow-auto scroll-smooth">
												<RouterProvider router={routerObject} />
											</main>
										</HelmetProvider>
									</LazyMotion>
								</CheckModalProvider>
							</ModalProvider>
						</SideBarProvider>
					</TargetProvider>
				</AuthProvider>
			</GuestProvider>
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}

export default App;
