import useSettings from "./useSettings";
import useConnection from "./useConnection";
import useMessages from "./useMessages";
import useChats from "./useChats";

import { sleep } from "../utils";

const useLiveUpdate = () => {
	const conn = useConnection();
	const { _id, updateSettings, listening_newMessage, chats, updateChat, call } =
		useSettings();
	const { addMessage, replaceMessage } = useMessages();
	const { getChats } = useChats();

	const updateMessage = ({ message }) => {
		replaceMessage(message._id, message);
	};

	const inComingCall = async (data) => {
		if (call) return conn.emit("callee-busy", data);

		updateSettings("call", data);
		conn.emit("ringing", data);
	};

	const start = () => {
		if (listening_newMessage) return;
		conn.on("receive-message-" + _id, (data) => {
			if (data.isNewChat) 
			getChats() ;
			else addMessage(data.message);
		});
		conn.on("message-updated-" + _id, updateMessage);
		conn.on("join-call-" + _id, inComingCall);
		conn.on("are-you-online-" + _id, async () => {
			await sleep(2000);
			conn.emit("i-am-online");
		});
		chats.forEach((chat) => {
			const partnerId = chat.partnerInfo._id;
			conn.on(`connected-${partnerId}`, () => {
				updateChat(chat.id, "lastSeen", "Online");
			});
			conn.on(`disconnected-${partnerId}`, (data) => {
				updateChat(chat.id, "lastSeen", data);
			});
		});
		updateSettings("listening_newMessage", true);
	};

	return {
		start,
	};
};

export default useLiveUpdate;
