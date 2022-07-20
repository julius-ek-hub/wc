import { useSelector, useDispatch } from "react-redux";
import { selectSettings, updateValue } from "../features/reduces/settings";

import useConnection from "./useConnection";
import useLocalStorage from "./useLocalStorage";

const useSettings = () => {
	const { value } = useSelector(selectSettings);
	const dispatch = useDispatch();
	const connection = useConnection();
	const { get } = useLocalStorage();

	const updateStore = (key, _value) => {
		dispatch(
			updateValue({
				...value,
				[key]: _value,
			}),
		);
	};

	const initializeUserInfo = (details) => {
		dispatch(updateValue(details));
	};

	const initializeExistingUser = () => {
		let theme = get("theme");
		if (!["dark", "light"].includes(theme)) theme = "dark";

		return new Promise(async (res) => {
			const token = get("wc-jwt-user");
			if (!token) res();
			const socket = await connection.use("/auth");
			socket.emit("verify", token, (response) => {
				if (response) initializeUserInfo({ ...response, theme });
				socket.disconnect();
				res();
			});
		});
	};

	return {
		settings: value,
		initializeUserInfo,
		initializeExistingUser,
		updateStore,
	};
};

export default useSettings;
