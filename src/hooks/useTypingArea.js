import { useState, useRef } from "react";

import useMessages from "./useMessages";
import useSettings from "./useSettings";

import { insertEmoji } from "../utils";

function useTypingArea() {
	const [text, setText] = useState(null);
	const [emoji, setEmoji] = useState({
		open: false,
		selected: null,
		type: "emoji",
	});

	const { replyingTo, setReplyIngTo, sendMessage } = useMessages();

	const textAreaREf = useRef();
	const { _id } = useSettings();

	const handleEmojiPicked = (value) => {
		const ta = textAreaREf.current;
		insertEmoji(value.character, ta);
		setText(ta.value);
		ta.focus();
	};

	const openEmojiPicker = () => {
		setEmoji({
			...emoji,
			open: true,
			type: "emoji",
		});
	};
	const closeEmojiPicker = () => {
		setEmoji({
			...emoji,
			open: false,
		});
	};

	const handleTextChange = (e, v) => {
		setText(e.target.value.trim());
	};

	const toSend = () => ({
		_id: Date.now(),
		_new: true,
		senderId: _id,
		starredBy: [],
		reactions: [],
		deleted: [],
		receipt: {
			sent: new Date().toISOString(),
			seen: [],
			received: [],
		},
		...(replyingTo && { replyingTo }),
	});

	const sendFile = (file) => {
		sendMessage({
			...toSend(),
			file,
		});
		setReplyIngTo(null);
	};

	const doSendMessage = (file) => {
		const ta = textAreaREf.current;
		sendMessage({
			...toSend(),
			message: text,
			...(file && { file }),
		});

		setText("");
		if (ta) {
			ta.value = "";
			ta?.focus();
		}
		closeEmojiPicker();
		setReplyIngTo(null);
	};

	return {
		handleTextChange,
		sendMessage: doSendMessage,
		sendFile,
		closeEmojiPicker,
		openEmojiPicker,
		handleEmojiPicked,
		setText,
		textAreaREf,
		text,
		emoji,
	};
}

export default useTypingArea;
