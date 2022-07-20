import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
	name: "settings",
	initialState: {
		value: null,
	},
	reducers: {
		updateValue(state, { payload }) {
			state.value = payload;
		},
	},
});

export const { updateValue } = settingsSlice.actions;

export const selectSettings = ({ settings }) => settings;

export default settingsSlice.reducer;
