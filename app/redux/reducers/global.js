import { createSlice, payloadAction } from "@reduxjs/toolkit";

const initialState = {
	loading: true,
	error: null,
	disabledActions: false,
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
		setDisabledActions(state, action) {
			state.disabledActions = action.payload;
			return;
		},
	},
});

const { actions, reducer } = globalSlice;

export const { setLoading, setError, disabledActions } = globalSlice.actions;

export default globalSlice.reducer;
