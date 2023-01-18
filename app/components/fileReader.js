"use client";
import React from "react";
import { useState, useEffect } from "react";
import "../styles/loader.css";

const Filereader = ({ type }) => {
	const [fileObject, setFileObject] = useState({
		content: "",
		ext: "",
		fileName: "",
		language: "",
		contentTranslated: "",
		type,
		length: 0,
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
			if (e.target.value.length) l = e.target.value.match(/\S+/g).length;
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
			const res = await fetch(
				"https://app.ronygedeon.com/api/transcription",
				// "http://localhost:3000/api/transcription",
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
			setState({ loading: false });
		} catch (error) {
			// alert(error.message);
			// window.location.reload();
			console.log(error.message);
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
							Remarquez que vous pouvez seulement traduire 3500
							mots et moins à la fois. Voici la liste des fichiers
							que nous acceptons: .doc, .docs, .txt
						</p>
						{/* <input
								type='file'
								onChange={(e) => handleChange(e)}
								accept='.doc,.docx,.txt'
							/> */}
						<p>
							Pour des raisons de sécurités, nous avons désactivé
							temporairement la traduction de texte par fichier.
						</p>
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

export default Filereader;
