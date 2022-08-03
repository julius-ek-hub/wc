import { useSelector, useDispatch } from "react-redux";
import { updateOthers, selectChats, addChats } from "../features/reduces/chats";

import useConnection from "./useConnection";
import useLiveUpdate from "./useLiveUpdates";
import useSettings from "./useSettings";

const useChats = () => {
	const {
		active,
		tempActive,
		listingForNewChat,
		publicContacts,
		openedUserInfo,
		...rest
	} = useSelector(selectChats);
	const connection = useConnection();
	const dispatch = useDispatch();

	const { _id, chats, updateSettings, store, resetSettings } = useSettings();

	const chatInfo = (id = active) => chats.find((chat) => chat.id === id);
	const chatInfoFromUserId = (p_id) =>
		chats.find((chat) => chat.partnerInfo._id === p_id);

	const activeChat = () => chats.find((chat) => chat.id === active);

	const updateChats = (key, value) => dispatch(updateOthers({ key, value }));

	const setActiveChat = (_id) => {
		setUserInfoOpen(false);
		dispatch(updateOthers({ key: "active", value: _id }));
	};

	const addTempChat = (partnerInfo) => {
		const _chats = chats.filter((chat) => !chat.temp);

		const id = _id + "_and_" + partnerInfo._id;
		const chat = {
			id,
			temp: true,
			partnerInfo,
		};

		resetSettings({
			...store,
			chats: [..._chats, chat],
			open: null,
		});
		setActiveChat(id);
	};

	const setUserInfoOpen = (open) => updateChats("userInfoOpened", open);

	const fetchPublicContacts = async () => {
		const { data } = await connection.emit("public-contacts");
		updateChats("publicContacts", data);
		return data;
	};

	const getChats = async () => {
		const { data } = await connection.emit("chats");
		updateSettings("chats", data);
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
		addTempChat,
		tempActive,
		publicContacts,
		userInfoOpened: openedUserInfo && openedUserInfo === active,
		setUserInfoOpen,
		updateChats,
		fetchPublicContacts,
		chatInfoFromUserId,
		addChats: (chat) => dispatch(addChats(chat)),
		listenForNewChats,
		getChats,
		...rest,
	};
};

export default useChats;
