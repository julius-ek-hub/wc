import { useSelector, useDispatch } from "react-redux";
import {
	selectMessages,
	updateOthers,
	addMessage as _addMessage,
} from "../features/reduces/messages";

import useChats from "./useChats";
import useConnection from "./useConnection";
import useSettings from "./useSettings";

const useMessages = () => {
	const { messages, fetching, replyingTo } = useSelector(selectMessages);
	const { active, tempActive, realActive, updateStore, addChats, chatInfo } =
		useChats();
	const { updateStore: updateSettings, settings } = useSettings();
	const dispatch = useDispatch();

	const conn = useConnection();

	/**
	 * @type {Array}
	 */

	const messagesForThisChat = messages[realActive];

	const addMessage = (details) => {
		dispatch(_addMessage(details));
	};

	const _updateOthers = (key, value) => dispatch(updateOthers({ key, value }));

	const setReplyIngTo = (message) => {
		_updateOthers("replyingTo", {
			...replyingTo,
			[realActive]: message,
		});
	};

	const getAllMessage = async () => {
		if (messagesForThisChat) return;

		if (tempActive)
			return _updateOthers("messages", {
				...messages,
				[tempActive]: [],
			});

		_updateOthers("fetching", {
			...fetching,
			[active]: true,
		});

		const { data } = await conn.emit("messages", {
			chatId: active,
		});

		_updateOthers("messages", {
			...messages,
			[active]: data,
		});

		_updateOthers("fetching", {
			...fetching,
			[active]: false,
		});
	};

	const sendMessage = async (message) => {
		addMessage({ message, chatId: realActive });
		if (tempActive) {
			const { data } = await conn.emit("new-chat", {
				_id: tempActive,
				message,
			});
			addChats(data);
			updateStore("tempActive", null);
			updateStore("active", tempActive);
			updateSettings("open", null);
		}

		const partnerId = chatInfo(realActive).partnerInfo._id;

		conn.emit("new-message", {
			message,
			chatId: realActive,
			partnerId,
		})
	};

	const listenForNewMessages = async () => {
		if (settings.listening_newMessage) return;

		updateSettings("listening_newMessage", true);

		conn.on("receive-message-" + settings._id, addMessage);
	};

	return {
		addMessage,
		sendMessage,
		setReplyIngTo,
		messages: messagesForThisChat || [],
		fetching: fetching[realActive],
		replyingTo: replyingTo[realActive],
		realActive,
		listenForNewMessages,
		getAllMessage,
	};
};

export default useMessages;
