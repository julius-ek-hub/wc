import { useTheme } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import {
	updateSettings as updateStore,
	updateChat as _updateChat,
} from "../features/reduces/settings";

import useConnection from "./useConnection";
import useLocalStorage from "./useLocalStorage";

/**
 * @returns {{
 * resetSettings: Function,
 * logOut: Function,
 * initializeExistingUser: Function,
 * updateSettings: Function,
 * wallPaperStyle: Function,
 * updateChat: Function,
 * store,
 * open: 'new-chat' | 'settings' | 'new-group' |
 * 'privacy.notifications' | 'privacy.lastSeen' |
 * 'privacy.readReceipt' | 'privacy.dp' | 'privacy.about' |
 * 'privacy.groups' | 'privacy.blcoked' | 'privacy.disappearingMessages',
 * wallpaper: String,
 * wallpaper_preview: String,
 * userName: String,
 * dp: String,
 * telephone: String,
 * bio: String,
 * chats: Array,
 * groups: Array,
 * notifications: {
 * muted: [String],
 * sound: String,
 * pushNotifications: Boolean,
 * muteReactionNotifications: Boolean,
 * },
 * privacy: {
 * accountType: 'public' | 'private',
 * lastSeen: "no-one" | "contacts" | "everyone" | "contacts-except",
 * dp: "no-one" | "contacts" | "everyone" | "contacts-except",
 * groups: "no-one" | "contacts" | "everyone" | "contacts-except",
 * readReceipts: Boolean,
 * disappearingMessages: Number | Boolean
 * },
 * _id: String,
 * simpleInfo: {
 * userName: String,
 * dp: String,
 * telephone: String,
 * _id: String,
 * }
 * }}
 */

const useSettings = () => {
	const { settings } = useSelector(({ settings }) => settings);
	const dispatch = useDispatch();
	const connection = useConnection();
	const { get, remove } = useLocalStorage();
	const { palette } = useTheme();

	const updateSettings = (key, value) => {
		dispatch(
			updateStore({
				...settings,
				[key]: value,
			}),
		);
	};

	const updateChat = (chatId, key, value) =>
		dispatch(_updateChat({ key, value, chatId }));

	const resetSettings = (value) => dispatch(updateStore(value));

	const logOut = () => {
		remove("wc-jwt-user");
		resetSettings(null);
	};

	const wallPaperStyle = (color) => {
		const wallpaper =
			color || settings.wallpaper_preview || settings.wallpaper || "";

		return wallpaper.startsWith("#")
			? {
					backgroundColor: wallpaper,
			  }
			: wallpaper === "default"
			? {
					backgroundImage: `url(/bg.${palette.mode}.png)`,
					backgroundSize: "contain",
			  }
			: {
					backgroundImage: wallpaper,
					backgroundSize: "contain",
			  };
	};

	const initializeExistingUser = () => {
		let theme = get("theme");
		if (!["dark", "light"].includes(theme)) theme = "dark";

		return new Promise(async (res) => {
			const token = get("wc-jwt-user");
			if (!token || settings) return res();
			const socket = await connection.use("/auth");
			socket.emit("verify", token, (response) => {
				if (response?.account)
					resetSettings({
						...response.account,
						theme,
						RTC_APPID: response.RTC_APPID,
					});
				socket.disconnect();
				res();
			});
		});
	};

	return {
		...settings,
		store: settings,
		simpleInfo: {
			userName: settings?.userName,
			telephone: settings?.telephone,
			dp: settings?.dp,
			_id: settings?._id,
			bio: settings?.bio,
		},
		resetSettings,
		logOut,
		updateChat,
		initializeExistingUser,
		updateSettings,
		wallPaperStyle,
	};
};

export default useSettings;
