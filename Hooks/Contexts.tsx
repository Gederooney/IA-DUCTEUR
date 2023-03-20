import { createContext } from "react";
import { ITraductorContextProps } from "@/types";

export const TraductorContext = createContext<ITraductorContextProps>(
	{} as ITraductorContextProps
);
