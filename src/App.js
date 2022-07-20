import ThemeProvider from "@mui/material/styles/ThemeProvider";

import WhatsAppDesktop from "./components/desktop";
import FullScreenLoading from "./components/common/LoadingIndicators/FullScreenLoading";

import themeInMode from "./config/theme";

import useAppInitialiser from "./hooks/useAppInitialiser";

function App() {
	const { loading, settings } = useAppInitialiser();

	return (
		<ThemeProvider theme={themeInMode(settings?.theme)}>
			<FullScreenLoading loading={loading} />
			<WhatsAppDesktop />
		</ThemeProvider>
	);
}

export default App;
