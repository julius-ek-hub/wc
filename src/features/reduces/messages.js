import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
	name: "messages",
	initialState: {
		messages: {},
		selected: {},
		replyingTo: {},
		fetching: {},
		messagesLoaded: {},
	},
	reducers: {
		updateOthers(state, { payload: { key, value } }) {
			state[key] = value;
		},
		addMessage(state, { payload: message }) {
			const chatId = message.chatId;
			let messages = state.messages[chatId];
			if (!messages) messages = [];
			if (messages.find((m) => m._id === message._id)) return;
			messages.push(message);
			state.messages[chatId] = messages;
		},
		replaceMessage(state, { payload }) {
			const { _id, newMessage } = payload;
			const chatId = newMessage.chatId;
			let _messages = state.messages[chatId];
			let index = _messages.findIndex((_message) => _message._id === _id);
			state.messages[chatId].splice(index, 1, newMessage);
		},
	},
});

export const { updateOthers, addMessage, replaceMessage } =
	contactSlice.actions;

export const selectMessages = ({ messages }) => messages;

export default contactSlice.reducer;
