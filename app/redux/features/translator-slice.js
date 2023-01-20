import { createSlice, payloadAction } from "@reduxjs/toolkit";

const initialState = {
	file: {
		object: null,
		fileName: null,
		extension: null,
	},
	text: {
		content: "",
		wordCount: 0,
	},
	lang: { label: "Français", value: "French" },
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
	},
});

const { actions, reducer } = translatorSlice;

export const { setFile, setText, setTranlateType, setLang, setTranslated } =
	translatorSlice.actions;
export default translatorSlice.reducer;
