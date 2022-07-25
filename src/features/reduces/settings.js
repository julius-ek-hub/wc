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
	},
});

export const { updateSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
