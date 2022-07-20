import { useContext } from "react";

import MessageContext from "../contexts/MessageContext";
import useMessages from "./useMessages";

const useMessage = () => {
	const messageId = useContext(MessageContext);
	const { messages, setReplyIngTo } = useMessages();

	const index = messages.findIndex(({ _id }) => _id === messageId);

	return {
		/**
		 * @type {{}}
		 */
		message: messages.find(({ _id }) => _id === messageId),
		previous: messages[index - 1],
		setReplyIngTo,
	};
};

export default useMessage;
