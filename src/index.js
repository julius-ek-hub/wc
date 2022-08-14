import "./index.css";

import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import chats from "./features/reduces/chats";
import settings from "./features/reduces/settings";
import messages from "./features/reduces/messages";
import extras from "./features/reduces/extras";

import App from "./App";
import ErrorBoundary from "./components/ErrorBoundary";

const store = configureStore({
	reducer: { chats, settings, messages, extras },
});

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
	<Provider store={store}>
		<ErrorBoundary>
			<App />
		</ErrorBoundary>
	</Provider>,
);
