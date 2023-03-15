import { createSlice, payloadAction } from "@reduxjs/toolkit";

const initialState = {
	file: {
		url: null,
		name: "",
	},
	text: {
		content: "",
		wordCount: 0,
	},
	lang: { label: "Anglais", value: "English" },
	translated: "",
	translateType: null,
};

const translatorSlice = createSlice({
	name: "translator",
	initialState,
	reducers: {
		setFile(state, action) {
			state.file = action.payload;
		},
		setText(state, action) {
			state.text = action.payload;
		},
		setTranslated(state, action) {
			state.translated = action.payload;
		},
		setTranlateType(state, action) {
			state.translateType = action.payload;
		},
		setLang(state, { type, payload }) {
			state.lang = payload;
		},
		resetTranslateState(state, action) {
			state = initialState;
		},
	},
});

const { actions, reducer } = translatorSlice;

export const {
	setFile,
	setText,
	setTranlateType,
	setLang,
	setTranslated,
	resetTranslateState,
} = translatorSlice.actions;
export default translatorSlice.reducer;
