import React, { useState, useEffect } from "react";
import axios from "axios";
import Error from "./Error";
import { useSelector } from "react-redux";
import store from "../redux/store";
import {
	setText,
	setTranslated,
	setLang,
} from "../redux/features/translator-slice";
// import { config } from "dotenv";
import { setLoading, setError } from "../redux/reducers/global";

// config();
const languagesList = [
	{ label: "Français", value: "French" },
	{ label: "Espagnol", value: "Spanish" },
	{ label: "Anglais", value: "English" },
	{ label: "Italien", value: "Italian" },
	{ label: "Allemand", value: "German" },
	{ label: "Mandarin", value: "Chinese" },
	{ label: "Japonais", value: "Japanese" },
];
const apiUrl =
	process.env.NODE_ENV === "production"
		? process.env.PROD_API_URL
		: process.env.DEV_API_URL;

console.log(apiUrl);

function validateTextInput(text) {
	if (!text) {
		return "Svp veuillez mettre du texte à traduire.";
	}
	const wordCount = text.match(/\b\w+\b/g).length;
	if (wordCount > 3500) {
		return "Vous ne pouvez pas convertir plus de 2500 mots à la fois.";
	}
	return "";
}

const Translator = () => {
	const text = useSelector((state) => state.translator.text.content);
	const wordCount = useSelector((state) => state.translator.text.wordCount);
	const langue = useSelector((state) => state.translator.lang);
	const translated = useSelector((state) => state.translator.translated);
	const type = useSelector((state) => state.translator.translateType);

	const loading = useSelector((state) => {
		state.global.loading;
	});
	useEffect(() => {}, [text, langue, wordCount, translated]);

	const handleChangeText = (e) => {
		const l = e.target.value.match(/\S+/g)?.length;
		if (l <= 3500) {
			store.dispatch(
				setText({ content: e.target.value, wordCount: l || 0 })
			);
		} else
			store.dispatch(
				setText({
					content:
						e.target.value.split(" ").slice(0, 3500).join(" ") +
						" ",
					wordCount: l || 0,
				})
			);

		return;
	};

	const handleSubmitText = async (e) => {
		e.preventDefault();

		const errorMessage = validateTextInput(text);
		if (errorMessage) store.dispatch(setError(errorMessage));
		else {
			try {
				store.dispatch(setLoading(true));
				const res = await axios.post(`${apiUrl}/translate/text`, {
					str: text,
					lang: langue.value,
				});
				if (res.status === 200) {
					const { translated } = res.data;
					store.dispatch(setTranslated(translated));
				} else
					store.dispatch(
						setError("Désolé nous avaons rencontré une erreur")
					);
				store.dispatch(setLoading(false));
			} catch (error) {
				store.dispatch(setLoading(false));
				store.dispatch(setError(error.message));
				console.log(error);
			}
		}
	};

	const copyToclipBoard = (e) => {
		navigator.clipboard.writeText(translated).then(
			() => {},
			() => {}
		);
	};

	const download = (e) => {
		const blob = new Blob([translated], {
			type: "text/plain",
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `traduit.txt`;
		a.click();
		return;
	};

	return (
		!loading && (
			<div className='content'>
				<Error
					errorMessage={useSelector((state) => state.global.error)}
				/>
				{type === "text" && (
					<div className='wrapper'>
						<div className='box'>
							<p className='bodyCopy'>
								Utilisez la boîte ci-dessous pour écrire votre
								texte. Notez qu'il n'est pas possible de
								traduire un texte avec plus de 3500 mots à la
								fois. Si votre texte est trop long, considérez à
								changer la methode de traduction.
							</p>
							<div className='infos'>
								<p className='highlightText'>
									Nombre de mots:<span>{wordCount}</span>
								</p>
								<div className='highlightText'>
									Vous allez traduire en:
									<span>{langue && langue.label}</span>
								</div>
							</div>
							<textarea
								type='text'
								placeholder='Ecrivez votre text ici'
								onFocus={(e) => (e.target.placeholder = "")}
								onBlur={(e) =>
									(e.target.placeholder =
										"Ecrivez votre text ici")
								}
								onChange={(e) => handleChangeText(e)}
								value={text}
							></textarea>
						</div>

						<div className='subInfos'>
							<div className='langueSelector'>
								<label htmlFor='langue'>
									Langue de traduction
								</label>
								<select
									name='langue'
									onChange={(e) =>
										store.dispatch(
											setLang(
												languagesList.find(
													(l) =>
														l.value ===
														e.target.value
												)
											)
										)
									}
									defaultValue={langue.value}
								>
									{languagesList.map((l) => {
										return (
											<option
												key={l.value}
												value={l.value}
												defaultValue={
													l.value === langue.value
														? true
														: false
												}
											>
												{l.label}
											</option>
										);
									})}
								</select>
							</div>
							<div className='sub-btns'>
								<button
									disabled={!(wordCount && true)}
									onClick={(e) => handleSubmitText(e)}
								>
									Traduire
								</button>
							</div>
						</div>

						{translated && (
							<div className='box'>
								<p className='bodyCopy'>
									Votre texte à bien ete traduit
								</p>
								<div className='handleTranslated'>
									<button
										className='highlightText'
										href='#'
										onClick={(e) => copyToclipBoard(e)}
									>
										<svg
											stroke='currentColor'
											fill='none'
											strokeWidth='2'
											viewBox='0 0 24 24'
											strokeLinecap='round'
											strokeLinejoin='round'
											className='h-4 w-4'
											height='1em'
											width='1em'
											xmlns='http://www.w3.org/2000/svg'
										>
											<path d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'></path>
											<rect
												x='8'
												y='2'
												width='8'
												height='4'
												rx='1'
												ry='1'
											></rect>
										</svg>
										<span>Copier</span>
									</button>
									<button
										className='highlightText'
										href='#'
										onClick={(e) => download(e)}
									>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='12'
											height='12'
											viewBox='0 0 24 24'
											fill='#ffffff90'
										>
											<path d='M8 20h3v-5h2v5h3l-4 4-4-4zm11.479-12.908c-.212-3.951-3.473-7.092-7.479-7.092s-7.267 3.141-7.479 7.092c-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h3.5v-2h-3.5c-1.93 0-3.5-1.57-3.5-3.5 0-2.797 2.479-3.833 4.433-3.72-.167-4.218 2.208-6.78 5.567-6.78 3.453 0 5.891 2.797 5.567 6.78 1.745-.046 4.433.751 4.433 3.72 0 1.93-1.57 3.5-3.5 3.5h-3.5v2h3.5c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408z' />
										</svg>
										<span>
											Télécharger un fichier text.txt
										</span>
									</button>
								</div>
								<textarea
									type='text'
									readOnly={true}
									value={translated}
									className='translated'
								></textarea>
							</div>
						)}
					</div>
				)}
				{type === "file" && <></>}
			</div>
		)
	);
};

export default Translator;
