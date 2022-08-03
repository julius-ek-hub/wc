import { createSlice } from "@reduxjs/toolkit";

const permissionsSlice = createSlice({
	name: "permissions",
	initialState: {
		camera: null,
		microphone: null,
		notifiaction: null,
	},
	reducers: {
		update(state, { payload }) {
			state = payload;
		},
	},
});

export const { update } = permissionsSlice.actions;

export default permissionsSlice.reducer;
