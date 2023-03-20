import { IContext } from "@/types";
import React, { useState, DragEvent } from "react";
import { useTraductorContext } from "./useContexts";

const useFileParse = () => {
	const [_, setDragOver] = useState(false);
	const { context, setContext } = useTraductorContext();
	const { error, flow, file, lang, text } = context;

	// handle a file by it's type
	const handleBytype = {
		"text/plain": (file: File) => {
			const previewUrl = URL.createObjectURL(file);
			const reader = new FileReader();
			reader.readAsText(file);
			reader.onload = () => {
				setContext({
					...context,
					flow: "text",
					previewUrl,
					file,
					text: reader.result as string,
				});
			};
		},
		"application/pdf": (file: File) => {
			const previewUrl = URL.createObjectURL(file);
			setContext({
				...context,
				flow: "file",
				previewUrl,
				file,
			});
		},
	};

	// check if file size is not too big
	const checkFileSize = (file: File) => {
		const { maxFileSize, error } = context;
		const fileSize = file.size;
		const fileType = file.type as keyof typeof maxFileSize;

		if (fileSize > maxFileSize[fileType]) {
			error.set("fileSize", "Le fichier est trop volumineux");
			setContext({
				...context,
				error,
			});
			return false;
		}
		return true;
	};

	// check if file type is supported
	const checkFileType = (file: File) => {
		const { maxFileSize } = context;
		const fileType = file.type as keyof typeof maxFileSize;

		if (!maxFileSize[fileType]) {
			error.set("fileType", "Le type de fichier n'est pas supporté");
			setContext({
				...context,
				error,
			});
			return false;
		}
		return true;
	};

	// parse the file
	const parseFile = (file: File) => {
		if (!file) return;

		if (checkFileSize(file) && checkFileType(file)) {
			const fileType = file.type as keyof typeof handleBytype;
			handleBytype[fileType](file);
		}
	};

	// handle the submit
	const submit = async () => {
		if (error.size > 0 || (!file && !text.length)) {
			error.set(
				"error",
				"Veuillez choisir un fichier ou écrire un texte"
			);
			setContext({
				...context,
				error,
			});
			const timeout = setTimeout(() => {
				error.delete("error");
				setContext({
					...context,
					error,
				});
				clearTimeout(timeout);
			}, 3000);
			return;
		}

		type TranslatedResult = {
			translatedText?: string;
			translatedFileUrl?: string;
		};

		let translated: TranslatedResult = {}; // either the text or the file url

		const formData = new FormData();
		formData.append("lang", lang.key);
		formData.append("flow", flow);

		if (flow === "file") formData.append("file", file as File);
		if (flow === "text") formData.append("text", text);

		setContext({
			...context,
			loading: true,
		});

		try {
			console.log(formData);
			const response = await fetch(`/api/translate`, {
				method: "POST",
				body: formData,
			});
			const data = await response.json();
			if (flow === "file") {
				const { jobId } = data as {
					jobId: string;
				};
				// verify job state by id
			} else {
				const { text, detected_source_language } = data as {
					text: string;
					detected_source_language: string;
				};
				translated = {
					translatedText: text,
				};
			}

			setContext({
				...context,
				...translated,
				loading: false,
			});
		} catch (e) {
			error.set("error", "Une erreur est survenue");
			setContext({
				...context,
				error,
				loading: false,
			});
			console.log(e);
		}
	};

	// verify job state by id
	const verifyJob = async (jobId: string) => {
		const interval = setInterval(async () => {
			try {
				const response = await fetch(`/api/translate/${jobId}`, {
					method: "GET",
				});
				const { data } = await response.json();
				const { state } = data as {
					state: string;
				};
				if (state === "DONE") {
					clearInterval(interval);
				}
			} catch (error) {
				console.log(error);
			}
		}, 1000);
	};

	// handle the reset
	const reset = (switchType: boolean) => {
		context.error.clear();
		setContext({
			...context,
			flow: switchType ? (flow === "file" ? "text" : "file") : flow,
			file: null,
			previewUrl: undefined,
			text: "",
			lang: {
				label: "anglais (américain)",
				key: "en-US",
			},
			loading: false,
			translatedFileUrl: undefined,
			translatedText: undefined,
		});
	};

	// handle the drag and drop
	const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setDragOver(true);
	};

	const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
		setDragOver(false);
	};

	const handleDrop = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
		setDragOver(false);
		const file = event.dataTransfer.files[0];
		parseFile(file);
	};

	const handleCTAClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		const input = document.createElement("input");
		input.type = "file";
		input.accept = ".txt,.pdf";
		input.onchange = (e: Event) => {
			const target = e.target as HTMLInputElement;
			const file = target.files?.[0];
			if (file) {
				return parseFile(file);
			}
			error.set("file", "Veuillez choisir un fichier");
			setContext({
				...context,
				error,
			});
			setTimeout(() => {
				error.delete("file");
				setContext({
					...context,
					error,
				});
			});
		};
		input.click();
	};

	return {
		parseFile,
		submit,
		reset,
		handleDragOver,
		handleDragLeave,
		handleDrop,
		handleCTAClick,
	};
};

export default useFileParse;
