import { createSlice } from "@reduxjs/toolkit";

const contactSlice = createSlice({
	name: "messages",
	initialState: {
		messages: {},
		selected: {},
		replyingTo: {},
		fetching: {},
	},
	reducers: {
		updateOthers(state, { payload: { key, value } }) {
			state[key] = value;
		},
		addMessage(state, { payload: { chatId, message } }) {
			let messages = state.messages[chatId];
			if (!messages) messages = [];
			if (messages.find((m) => m._id === message._id)) return;
			messages.push(message);
			state.messages[chatId] = messages;
		},
	},
});

export const { updateOthers, addMessage } = contactSlice.actions;

export const selectMessages = ({ messages }) => messages;

export default contactSlice.reducer;
