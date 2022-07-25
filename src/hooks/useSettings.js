import { useSelector, useDispatch } from "react-redux";
import { updateSettings as updateStore } from "../features/reduces/settings";

import useConnection from "./useConnection";
import useLocalStorage from "./useLocalStorage";

const useSettings = () => {
	const { settings } = useSelector(({ settings }) => settings);
	const dispatch = useDispatch();
	const connection = useConnection();
	const { get } = useLocalStorage();

	const updateSettings = (key, value) => {
		dispatch(
			updateStore({
				...settings,
				[key]: value,
			}),
		);
	};

	const initializeUserInfo = (details) => {
		dispatch(updateStore(details));
	};

	const initializeExistingUser = () => {
		let theme = get("theme");
		if (!["dark", "light"].includes(theme)) theme = "dark";

		return new Promise(async (res) => {
			const token = get("wc-jwt-user");
			if (!token) return res();

			const socket = await connection.use("/auth");
			socket.emit("verify", token, (response) => {
				if (response) initializeUserInfo({ ...response, theme });
				socket.disconnect();
				res();
			});
		});
	};

	return {
		...settings,
		initializeUserInfo,
		initializeExistingUser,
		updateSettings,
	};
};

export default useSettings;
