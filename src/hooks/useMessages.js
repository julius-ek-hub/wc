import { useSelector, useDispatch } from "react-redux";
import {
	selectMessages,
	updateOthers,
	replaceMessage as _replaceMessage,
	addMessage as _addMessage,
} from "../features/reduces/messages";

import useChats from "./useChats";
import useConnection from "./useConnection";
import useSettings from "./useSettings";

const useMessages = () => {
	const { messages, fetching, replyingTo, selected, messagesLoaded } =
		useSelector(selectMessages);
	const { active, chatInfo } = useChats();
	const dispatch = useDispatch();
	const { _id } = useSettings();

	const conn = useConnection();

	/**
	 * @type {Array}
	 */

	const _messagesForThisChat = messages[active] || [];
	const selectedForThisChat = selected[active] || [];
	const notDeleted = (m) =>
		!m.deleted.find((d) => d.types.includes(1) && d._id === _id);

	const messagesForThisChat = _messagesForThisChat.filter(notDeleted);

	const addMessage = (message) => {
		dispatch(_addMessage(message));
	};
	const setReplyIngTo = (message) => {
		_updateOthers("replyingTo", {
			...replyingTo,
			[active]: message,
		});
	};

	const _updateOthers = (key, value) => dispatch(updateOthers({ key, value }));

	const lastMessage = (chatId = active) => {
		let _messages = messages[chatId]?.filter(notDeleted);
		return _messages
			? _messages[_messages.length - 1]
			: chatInfo(chatId).lastMessage;
	};

	const replaceMessage = (_id, newMessage) => {
		dispatch(_replaceMessage({ _id, newMessage }));
	};

	const select = (messageId, chatId = active) => {
		let _selected = [...(selected[chatId] || [])];
		if (_selected.includes(messageId))
			_selected = _selected.filter((_id) => _id !== messageId);
		else _selected.push(messageId);

		_updateOthers("selected", {
			...selected,
			[chatId]: _selected,
		});
		setReplyIngTo(null);
	};
	const resetSelect = (chatId = active) => {
		_updateOthers("selected", {
			...selected,
			[chatId]: [],
		});
	};

	const getAllMessage = async (_chatId) => {
		const chatId = _chatId || active;

		if (messagesLoaded[chatId]) return;

		_updateOthers("fetching", {
			...fetching,
			[chatId]: true,
		});

		const { data } = await conn.emit("messages", { chatId });

		_updateOthers("messages", {
			...messages,
			[chatId]: data,
		});

		_updateOthers("fetching", {
			...fetching,
			[chatId]: false,
		});

		_updateOthers("messagesLoaded", {
			...messagesLoaded,
			[chatId]: true,
		});
	};

	const sendMessage = async (message, _chatId) => {
		const chatId = _chatId || active;

		addMessage({ ...message, chatId });
	};

	return {
		addMessage,
		sendMessage,
		setReplyIngTo,
		select,
		resetSelect,
		lastMessage,
		selected: selectedForThisChat,
		selecting: selectedForThisChat.length > 0,
		messages: messagesForThisChat || [],
		allMessages: messages,
		fetching: fetching[active],
		replyingTo: replyingTo[active],
		getAllMessage,
		replaceMessage,
	};
};

export default useMessages;
