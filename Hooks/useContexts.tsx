import { useContext } from "react";
import { TraductorContext } from "./Contexts";

export const useTraductorContext = () => {
	return useContext(TraductorContext);
};
