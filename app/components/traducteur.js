"use client";
import React from "react";
import { useState, useEffect } from "react";
import "../styles/loader.css";

const Traducteur = ({ type }) => {
	const [fileObject, setFileObject] = useState({
		content: "",
		ext: "",
		fileName: "",
		language: "",
		contentTranslated: "",
		type,
		length: 0,
		file: null,
	});
	const [state, setState] = useState({ loading: true });
	useEffect(() => {
		setState({ ...state, loading: false });
	}, [fileObject]);

	const languagesList = [
		{ label: "Français", value: "French" },
		{ label: "Espagnol", value: "Spanish" },
		{ label: "Anglais", value: "English" },
		{ label: "Italien", value: "Italian" },
		{ label: "Allemand", value: "German" },
		{ label: "Mandarin", value: "Chinese" },
		{ label: "Japonais", value: "Japanese" },
	];
	const handleChange = (e) => {
		e.preventDefault();
		if (e.target.type === "file") {
			const file = e.target.files[0];
			const fileName = file.name;
			const fileExtension = fileName.split(".").pop();
			const reader = new FileReader();

			reader.onload = () => {
				setFileObject({
					...fileObject,
					content: reader.result,
					fileName: fileName.split(".").slice(0, -1).join("."),
					ext: fileExtension,
				});
			};
			reader.readAsText(file);
		} else {
			let l = 0;
			if (e.target.value.length) l = e.target.value.match(/\S+/g)?.length;
			if (l <= 3500) {
				setFileObject({
					...fileObject,
					length: l,
					content: e.target.value,
				});
			} else {
				setFileObject({
					...fileObject,
					length: 3500,
					content:
						e.target.value.split(" ").slice(0, 3500).join(" ") +
						" ",
				});
			}
		}
		return;
	};
	const handleSubmit = async (e) => {
		try {
			setState({ ...state, loading: true });
			if (type === "text") {
				const res = await fetch(
					// "https://app.ronygedeon.com/api/transcription",
					"http://localhost:3000/api/transcription",
					{
						method: "POST",
						body: JSON.stringify({
							str: fileObject.content,
							lang: fileObject.language,
						}),
					}
				);
				const { str } = await res.json();
				setFileObject({ ...fileObject, contentTranslated: str });
			} else if (fileObject.file) {
				const formData = new FormData();

				const lang = document.createElement("input");
				lang.type = "text";
				lang.name = "lang";
				lang.required = true;
				lang.value = fileObject.language;

				formData.append("file", fileObject.file);
				// formData.append(lang);

				const res = await fetch(
					// "http://localhost:3000/api/transcriptionFichier.js",
					"http://localhost:3000/api/transcriptionFichier.js",
					{
						method: "POST",
						body: formData,
					}
				);
				const { str } = await res.json();
				setFileObject({ ...fileObject, contentTranslated: str });
			}
			setState({ loading: false });
		} catch (error) {
			console.log(error.message);
			setState({ loading: false });
		}
	};

	const download = () => {
		const blob = new Blob([fileObject.contentTranslated], {
			type: "text/plain",
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${fileObject.fileName}-${fileObject.language}.${fileObject.ext}`;
		a.click();
		return;
	};

	const copyToClipBoard = () => {
		try {
			navigator.clipboard.writeText("translated");
		} catch (error) {
			
		}
	};
	if (state.loading)
		return (
			<div className='lds-roller'>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		);
	return (
		<div className='fileReader-content'>
			<div className='input'>
				{type === "file" ? (
					<div className='box'>
						<p>
							S'il vous plait, choisissez un fichier à convertir.
							Remarquez que vous pouvez seulement traduire 1
							fichier de 1M et moins à la fois. Voici la liste des
							fichiers que nous acceptons: .txt
						</p>
						<div className='fileInput'>
							<label for='file-selector'>
								<span
									className='custom-button'
									onClick={(e) => {
										e.preventDefault();
										return document
											.getElementById("file-selector")
											.click();
									}}
								>
									{fileObject.fileName.length
										? fileObject.fileName
										: "Choisir un fichier"}
								</span>
								<input
									type='file'
									id='file-selector'
									style={{ display: "none" }}
									accept='.txt, .doc, .docx'
									onChange={(e) => {
										const file = e.target.files[0];
										if (file.size > 1024 * 1024) {
											alert("Le fichier est trop grand");
											return (e.target.value = "");
										}
										if (file.type !== "text/plain") {
											alert(
												"Le type de fichier n'est pas valid"
											);
											return (e.target.value = "");
										}
										const fileName = file.name;
										const fileExtension =
											fileName.substring(
												fileName.lastIndexOf(".") + 1
											);
										setFileObject({
											...fileObject,
											file,
											fileName,
											ext: fileExtension,
										});
									}}
								/>
							</label>
						</div>
						<div>
							<label htmlFor='langue'>Langue de traduction</label>

							<select
								name='langue'
								onChange={(e) => {
									setFileObject({
										...fileObject,
										language: e.target.value.trim(),
									});
								}}
							>
								<option value=''>
									Choississez choississez une langue
								</option>
								{languagesList.map((l) => (
									<option key={l.value} value={l.value}>
										{l.label}
									</option>
								))}
							</select>
						</div>
						<div className='btns'>
							<button
								disabled={
									fileObject.fileName && fileObject.language
										? false
										: true
								}
								onClick={(e) => handleSubmit(e)}
							>
								Soumettre le texte
							</button>
						</div>
						<div className='result'>
							{fileObject.contentTranslated.length ? (
								<textarea
									value={fileObject.contentTranslated}
									readOnly={true}
								></textarea>
							) : (
								<></>
							)}
						</div>
					</div>
				) : (
					<div className='box'>
						<p>
							Utilisez la boîte ci-dessous pour écrire votre
							texte. Notez qu'il n'est pas possible de traduire un
							texte avec plus de 3500 mots à la fois.
						</p>
						<p>
							Nombre de mots: <span>{fileObject.length}</span>
						</p>
						<textarea
							type='text'
							placeholder='Ecrivez votre text ici'
							onFocus={(e) => (e.target.placeholder = "")}
							onBlur={(e) =>
								(e.target.placeholder =
									"Ecrivez votre text ici")
							}
							onChange={(e) => handleChange(e)}
							value={fileObject.content}
						></textarea>
						<div>
							<label htmlFor='langue'>Langue de traduction</label>
							<select
								name='langue'
								onChange={(e) => {
									setFileObject({
										...fileObject,
										language: e.target.value.trim(),
									});
								}}
							>
								<option value=''>
									Choississez choississez une langue
								</option>
								{languagesList.map((l) => (
									<option key={l.value} value={l.value}>
										{l.label}
									</option>
								))}
							</select>
						</div>
						<div className='btns'>
							<button
								disabled={
									fileObject.length && fileObject.language
										? false
										: true
								}
								onClick={(e) => handleSubmit(e)}
							>
								Soumettre le texte
							</button>
						</div>
						<div>
							{fileObject.contentTranslated.length ? (
								<textarea
									value={fileObject.contentTranslated}
									readOnly={true}
								></textarea>
							) : (
								<></>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Traducteur;

// {type.length ? (
// 	<>
// 		<p>
// 			Vous utilisez le traducteur par:{" "}
// 			{type === "file" ? "fichier" : "texte"}
// 		</p>
// 		<a href='#' onClick={(e) => setType("")}>
// 			Changez de methode
// 		</a>
// 	</>
// ) : (
// 	<>
// 		<p>
// 			Comment voulez-vous traduire un texte
// 			aujourd'hui?
// 		</p>
// 		<div className='btns'>
// 			<button onClick={(e) => setType("file")}>
// 				Par fichier
// 			</button>
// 			<button onClick={(e) => setType("text")}>
// 				j'écrirai le texte
// 			</button>
// 		</div>
// 	</>
// )}
