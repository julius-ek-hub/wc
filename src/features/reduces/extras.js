import { createSlice } from "@reduxjs/toolkit";

const extraSlice = createSlice({
	name: "extras",
	initialState: {
		emojis: null,
		gifs: null,
	},
	reducers: {
		setEmojis(state, { payload }) {
			state.emojis = payload;
		},
		setGiFs(state, { payload }) {
			state.gifs = payload;
		},
	},
});

export const selectExtras = ({ extras }) => extras;
export const { setEmojis, setGiFs } = extraSlice.actions;

export default extraSlice.reducer;
