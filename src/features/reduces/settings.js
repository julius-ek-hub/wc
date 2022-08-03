import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
	name: "settings",
	initialState: {
		settings: null,
	},
	reducers: {
		updateSettings(state, { payload }) {
			state.settings = payload;
		},
		updateChat(state, { payload: { key, value, chatId } }) {
			let chat = state.settings.chats.find((c) => c.id === chatId);
			chat[key] = value;
		},
	},
});

export const { updateSettings, updateChat } = settingsSlice.actions;

export default settingsSlice.reducer;
