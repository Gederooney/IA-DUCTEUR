const error = new Map([
	["fileSize", "File size is too big"],
	["fileType", "File type is not supported"],
	["file", "File is not supported"],
	["text", "Text is not supported"],
	["lang", "Language is not supported"],
]);

export interface IContext {
	flow: "file" | "text";
	file: File | null;
	previewUrl: string | undefined;
	text: string;
	translatedText: string | undefined;
	translatedFileUrl: string | undefined;
	lang: {
		key: string;
		label: string;
	};
	maxFileSize: {
		"text/plain": number;
		"application/pdf": number;
		"application/msword": number;
	};
	error: Map<string, string>;
	loading: boolean;
}

export interface ITraductorContextProps {
	context: IContext;
	setContext: (context: ITraductorContextProps["context"]) => void;
}
