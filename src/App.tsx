import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientOptions } from "./utils/contants";
import LandingPage from "./pages/landingPage";
import Auth from "./pages/Auth";
import HttpClient from "./network/HttpClient";
import AuthServiceImpl from "./services/AuthService";
import { AuthProvider } from "./context/AuthContext";
import Target from "./pages/Target";
import TargetServiceImpl from "./services/TargetService";
import { InfoProvider } from "./context/TargetContext";
import TargetDetail from "./pages/TargetDetail";
import TargetCreate from "./pages/TargetCreate";
import KakaoLogin from "./pages/KaKaoLogin";

const router = createBrowserRouter([
	{
		path: "/",
		element: <LandingPage />,
	},
	{
		path: "signin",
		element: <Auth />,
	},
	{
		path: "signup",
		element: <Auth />,
	},
	{
		path: "kakao",
		element: <KakaoLogin />,
	},
	{
		path: "target",
		element: <Target />,
	},
	{
		path: "target/:id",
		element: <TargetDetail />,
	},
	{ path: "target/create", element: <TargetCreate /> },
]);

function App() {
	const queryClient = new QueryClient(QueryClientOptions);

	const client = new HttpClient("http://localhost:8000");
	const authService = new AuthServiceImpl(client.httpClient);
	const infoService = new TargetServiceImpl(client.withToken());
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<AuthProvider authService={authService}>
					<InfoProvider infoService={infoService}>
						<main className="phone:w-phone desktop:w-desktop mx-auto bg-white min-h-full overflow-auto scroll-smooth">
							<RouterProvider router={router} />
						</main>
					</InfoProvider>
				</AuthProvider>
				<ReactQueryDevtools />
			</QueryClientProvider>
		</>
	);
}

export default App;
