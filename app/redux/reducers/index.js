import translatorSlice from "../features/translator-slice";
import globalSlice from "./global";

const rootReducer = {
	translator: translatorSlice,
	global: globalSlice,
};

export default rootReducer;
