import { createSlice, payloadAction } from "@reduxjs/toolkit";

const initialState = {
	loading: true,
	error: null,
};

const globalSlice = createSlice({
	name: "global",
	initialState,
	reducers: {
		setLoading(state, action) {
			state.loading = action.payload;
			return;
		},
		setError(state, action) {
			state.error = action.payload;
			return;
		},
	},
});

const { actions, reducer } = globalSlice;

export const { setLoading, setError } = globalSlice.actions;

export default globalSlice.reducer;
