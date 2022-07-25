import { useSelector, useDispatch } from "react-redux";
import { updateOthers, selectChats, addChats } from "../features/reduces/chats";

import useConnection from "./useConnection";
import useSettings from "./useSettings";

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

	const { _id } = useSettings();

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

	const updateChats = (key, value) => dispatch(updateOthers({ key, value }));

	const setUserInfoOpen = (open) =>
		updateChats("openedUserInfo", open ? realActive : null);

	const setActiveChat = (_id) => {
		setUserInfoOpen(false);
		dispatch(updateOthers({ key: "active", value: _id }));
	};

	const fetchPublicContacts = async () => {
		const { data } = await connection.emit("public-contacts");
		updateChats("publicContacts", data);
	};

	const listenForNewChats = async () => {
		if (listingForNewChat) return;

		updateChats("listingForNewChat", true);
		connection.use("/live");
		connection.on(`new-chat-${_id}`, (data) => {
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
		updateChats,
		fetchPublicContacts,
		addChats: (chat) => dispatch(addChats(chat)),
		listenForNewChats,
		...rest,
	};
};

export default useChats;
