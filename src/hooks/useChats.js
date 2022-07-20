import { useSelector, useDispatch } from "react-redux";
import { updateOthers, selectChats, addChats } from "../features/reduces/chats";

import useConnection from "./useConnection";
import useSettings from './useSettings';

const useChats = () => {
	const {
		chats,
		active,
		tempActive,
		listingForNewChat,
		publicContacts,
		openedUserInfo,
		...rest
	} = useSelector(selectChats);
	const connection = useConnection();
	const dispatch = useDispatch();

	const {settings} = useSettings();

	const realActive = active || tempActive;

	const chatInfo = (id) => chats.find((chat) => chat.id === id);

	const activeChat = () => {
		if (active) return chats.find((chat) => chat.id === active);
		else if (tempActive)
			return publicContacts.find(
				(contact) => contact._id === tempActive.split("_and_")[1],
			);
		return {};
	};

	const updateStore = (key, value) => dispatch(updateOthers({ key, value }));

	const setUserInfoOpen = (open) =>
		updateStore("openedUserInfo", open ? realActive : null);

	const setActiveChat = (_id) => {
		setUserInfoOpen(false);
		dispatch(updateOthers({ key: "active", value: _id }));
	};

	const fetchPublicContacts = async () => {
		const { data } = await connection.emit("public-contacts");
		updateStore("publicContacts", data);
	};

	const listenForNewChats = async () => {
		if (listingForNewChat) return;

		updateStore("listingForNewChat", true);
		connection.use("/live");
		connection.on(`new-chat-${settings._id}`, (data) => {
			dispatch(addChats(data));
		});
	};

	return {
		/**
		 * @type {Array}
		 */
		chats,
		active,
		chatInfo,
		activeChat,
		setActiveChat,
		realActive,
		tempActive,
		publicContacts,
		userInfoOpened: openedUserInfo && openedUserInfo === realActive,
		setUserInfoOpen,
		updateStore,
		fetchPublicContacts,
		addChats: (chat) => dispatch(addChats(chat)),
		listenForNewChats,
		...rest,
	};
};

export default useChats;
