import { useState, useRef } from "react";

import useMessages from "./useMessages";
import useChats from "./useChats";
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
	const { realActive } = useChats();

	const textAreaREf = useRef();
	const {
		settings: { _id, userName, dp, telephone },
	} = useSettings();

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

	const doSendMessage = () => {
		const ta = textAreaREf.current;

		sendMessage({
			_id: Date.now(),
			message: text,
			sender: { _id, userName: userName || "", dp: dp || "", telephone },
			receipt: {
				sent: new Date().toISOString(),
			},
			replyingTo,
		});

		setText("");
		ta.value = "";
		ta.focus();
		closeEmojiPicker();
		const container = document.querySelector(`#all_messages_for_${realActive}`);
		container.scrollTo({
			top: container.scrollHeight + container.clientHeight,
			behavior: "smooth",
		});
		setReplyIngTo(null);
	};

	return {
		handleTextChange,
		sendMessage: doSendMessage,
		closeEmojiPicker,
		openEmojiPicker,
		handleEmojiPicked,
		textAreaREf,
		text,
		emoji,
	};
}

export default useTypingArea;
