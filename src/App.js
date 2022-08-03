import ThemeProvider from "@mui/material/styles/ThemeProvider";

import WhatsAppClone from "./components/WhatsAppClone";
import FullScreenLoading from "./components/LoadingIndicators/FullScreenLoading";

import themeInMode from "./config/theme";

import useAppInitialiser from "./hooks/useAppInitialiser";

function App() {
	const { loading, settings } = useAppInitialiser();

	return (
		<ThemeProvider theme={themeInMode(settings?.theme)}>
			<FullScreenLoading loading={loading} />
			<WhatsAppClone />
		</ThemeProvider>
	);
}

export default App;
