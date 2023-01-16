"use client";
import React from "react";
import { useState, useEffect } from "react";
import "./styles/loader.css";

const page = () => {
	const [fileObject, setFileObject] = useState({
		content: "",
		ext: "",
		fileName: "",
		language: "",
		contentTranslated: "",
	});

	const [state, setState] = useState({
		loading: false,
		step: 0,
	});

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
			setState({ loading: false, step: 1 });
		};
		reader.readAsText(file);
	};
	const handleSubmit = async (e) => {
		try {
			setState({ ...state, loading: true });
			const res = await fetch("http://localhost:3000/api/transcription", {
				method: "POST",
				body: JSON.stringify({
					str: fileObject.content,
					lang: fileObject.language,
				}),
			});
			const { str } = await res.json();
			setFileObject({ ...fileObject, contentTranslated: str });
			setState({ loading: false, step: 3 });
		} catch (error) {
			alert(error.message);
			window.location.reload();
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
		setState({ ...state, step: 0 });
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
		<div>
			{state.step !== 3 ? (
				<div className='input'>
					<h4>Veuillez choisir un fichier à convertir</h4>
					<input
						type='file'
						name=''
						id=''
						onChange={(e) => handleChange(e)}
						accept='.doc, .docx, .txt'
					/>
				</div>
			) : (
				<></>
			)}
			{state.step === 1 ? (
				<select
					onChange={(e) => {
						setFileObject({
							...fileObject,
							language: e.target.value.trim(),
						});
						setState({ ...state, step: 2 });
					}}
				>
					<option value=''>Choississez choississez une langue</option>
					{languagesList.map((l) => (
						<option key={l.value} value={l.value}>
							{l.label}
						</option>
					))}
				</select>
			) : (
				<></>
			)}
			{state.step === 2 ? (
				<button
					className='btn'
					type='submit'
					onClick={(e) => handleSubmit(e)}
				>
					Traduire en{" "}
					{
						languagesList.find(
							(e) => e.value === fileObject.language
						).label
					}
				</button>
			) : (
				<></>
			)}
			{state.step === 3 ? (
				<>
					Votre fichier est traduit.
					<a
						className='btn'
						href='#'
						onClick={(e) => {
							e.preventDefault();
							return download();
						}}
					>
						Cliquez pour lélécharger
					</a>
				</>
			) : (
				<></>
			)}
		</div>
	);
};

export default page;
