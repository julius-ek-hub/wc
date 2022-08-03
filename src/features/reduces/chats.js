import { createSlice } from "@reduxjs/toolkit";
import { uniqueArray } from "../../utils";

const contactSlice = createSlice({
	name: "chats",
	initialState: {
		chats: [],
		publicContacts: [],
	},
	reducers: {
		updateChat(state, { payload }) {
			state.chats.find((chat) => chat._id === payload.id)[payload.key] =
				payload.value;
		},
		addChats(state, { payload }) {
			let _chat = Array.isArray(payload) ? payload : [payload];
			state.chats = uniqueArray([state.chats, _chat], "id");
		},
		updateOthers(state, { payload: { key, value } }) {
			state[key] = value;
		},
		updateChat(state, { payload: { key, value, chatId } }) {
			const chat = state.chats[chatId];
			chat[key] = value;
		},
	},
});

export const { addChats, updateOthers, updateChat } = contactSlice.actions;

export const selectChats = ({ chats }) => chats;

export default contactSlice.reducer;
