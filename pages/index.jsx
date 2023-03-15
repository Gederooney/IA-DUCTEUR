import Footer from "@/app/components/Footer.jsx";
import Header from "@/app/components/Header.jsx";
import React, { useState, useRef } from "react";
import Error from "@/app/components/Error";
import Head from "next/head";

import { useEffect } from "react";

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

const apiUrl =
	process.env.NODE_ENV === "production"
		? process.env.PROD_API_URL
		: process.env.DEV_API_URL;

const languagesList = [
	{ label: "Anglais", value: "English" },
	{ label: "Français", value: "French" },
	{ label: "Espagnol", value: "Spanish" },
	{ label: "Italien", value: "Italian" },
	{ label: "Allemand", value: "German" },
	{ label: "Mandarin", value: "Chinese" },
	{ label: "Japonais", value: "Japanese" },
];

function splitString(string) {
	const maxLength = 3500;
	const chunks = [];

	for (let i = 0; i < string.length; i += maxLength) {
		const chunk = string.substring(i, i + maxLength);
		chunks.push(chunk);
	}

	return chunks;
}

const index = () => {
	const [text, setText] = useState("");
	const [translatedText, setTranslatedText] = useState("kj");
	const [loading, setLoading] = useState(false);
	const [dragOver, setDragOver] = useState(false);
	const dragZoneRef = useRef(null);
	const [error, setError] = useState(new Map());

	const [copied, setCopied] = React.useState(false);

	const [lang, setLang] = useState({
		label: "Anglais",
		value: "English",
	});

	useEffect(() => {}, [text, translatedText, loading, dragOver, error, lang]);

	const handleChangeText = (e) => {
		const l = e.target.value.match(/\S+/g)?.length;
		setText(e.target.value);
		return;
	};
	const handleUploadFileCTABtnClick = (e) => {
		e.preventDefault();
		const input = document.createElement("input");
		input.type = "file";
		input.accept = ".txt";
		input.onchange = (e) => {
			const file = e.target.files[0];
			const reader = new FileReader();
			reader.onload = (e) => {
				const text = e.target.result;
				setText(text);
				document.getElementById("translator").scrollIntoView({
					behavior: "smooth",
				});
			};
			reader.readAsText(file, "UTF-8");
		};
		input.click();
	};

	const handleDragOver = (event) => {
		event.preventDefault();
		setDragOver(true);
	};

	const handleDragLeave = () => {
		setDragOver(false);
	};

	const handleDrop = (event) => {
		event.preventDefault();
		setDragOver(false);

		const file = event.dataTransfer.files[0];
		if (file.type === "text/plain") {
			const reader = new FileReader();
			reader.addEventListener("load", (event) => {
				setText(event.target.result);
			});
			reader.readAsText(file, "UTF-8");
		} else {
			const prev = error;
			prev.set("file", "Le fichier doit être un fichier .txt");
			setError(prev);
			removeError("file");
		}
	};

	const makeErrors = () => {
		const errors = [];
		error.forEach((value, key) => {
			errors.push(
				<Error
					key={key}
					message={value}
				/>
			);
		});
		return errors;
	};

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			setLoading(true);
			const chunks = splitString(text);

			const errorMessage = validateTextInput(text);
			if (errorMessage) {
				setLoading(false);
				const prev = error;
				prev.set("text", errorMessage);
				setError(prev);
				removeError("text");
				return;
			}

			const translatedChunks = [];
			for (let i = 0; i < chunks.length; i++) {
				const chunk = chunks[i];
				const res = await fetch(`${apiUrl}/translate/text`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						str: chunk,
						lang: lang.value,
					}),
				});
				const { translated } = await res.json();
				translatedChunks.push(translated);
			}
			console.log(translatedChunks);
			setTranslatedText(translatedChunks.join(""));
			setLoading(false);
		} catch (e) {
			setLoading(false);
			alert(e.message);
			const prev = error;
			prev.set("request", "Une erreur est survenue");
			setError(prev);
			removeError("request");
		}
	};

	const removeError = (key) => {
		let timeout = setTimeout(() => {
			const prev = error;
			prev.delete(key);
			setError(prev);
			return clearTimeout(timeout);
		}, 3000);
	};

	const copyToclipBoard = (e) => {
		navigator.clipboard.writeText(translatedText).then(
			() => {},
			() => {}
		);
	};

	const downloadFromText = (e) => {
		const blob = new Blob([translatedText], {
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
		<>
			<Head>
				<title>Traducteur de texte | Apps Rony Gédéon</title>
				<meta
					name='description'
					content='Traducteur de texte gratuit. Traduisez vos fichiers .txt en quelques secondes. Déposez votre fichier, nous le traduirons dans la langue de votre choix en quelques secondes et vous pouvez le télécharger pour toutes vos utilisations.'
				/>
				<meta
					name='robots'
					content='index, follow'
				/>
				<meta
					httpEquiv='Content-Type'
					content='text/html; charset=utf-8'
				/>
				<meta
					name='language'
					content='French'
				/>
				<meta
					name='revisit-after'
					content='7 days'
				/>
				<meta
					name='author'
					content='Rony Gédéon'
				/>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1.0'
				/>
				<link
					rel='icon'
					href='/favicon.ico'
				/>

				<meta
					property='og:title'
					content='Traducteur de texte | Apps Rony Gédéon'
				/>
				<meta
					property='og:description'
					content='Traducteur de texte gratuit. Traduisez vos fichiers .txt en quelques secondes. Déposez votre fichier, nous le traduirons dans la langue de votre choix en quelques secondes et vous pouvez le télécharger pour toutes vos utilisations.'
				/>
				<meta
					property='og:type'
					content='website'
				/>
				<meta
					property='og:url'
					content='https://apps.ronygedeon.com'
				/>
				<meta
					property='og:site_name'
					content='Apps Rony Gédéon'
				/>
				<meta
					property='og:image'
					content='/images/og-image.png'
				/>
				<meta
					property='og:image:secure_url'
					content='/images/og-image.png'
				/>
				<meta
					property='og:image:alt'
					content='Apps Rony Gédéon'
				/>
				<meta
					property='og:image:type'
					content='image/png'
				/>
				<meta
					property='og:image:width'
					content='1200'
				/>
				<meta
					property='og:image:height'
					content='630'
				/>
				<meta
					property='og:locale'
					content='fr_FR'
				/>

				<meta
					name='twitter:card'
					content='summary_large_image'
				/>
				<meta
					name='twitter:site'
					content='@ronygedeon'
				/>
				<meta
					name='twitter:creator'
					content='@ronygedeon'
				/>
				<meta
					name='twitter:title'
					content='Traducteur de texte | Apps Rony Gédéon'
				/>
				<meta
					name='twitter:description'
					content='Traducteur de texte gratuit. Traduisez vos fichiers .txt en quelques secondes. Déposez votre fichier, nous le traduirons dans la langue de votre choix en quelques secondes et vous pouvez le télécharger pour toutes vos utilisations.'
				/>
				<meta
					name='twitter:image'
					content='/images/og-image.png'
				/>

				<link
					rel='canonical'
					href='https://apps.ronygedeon.com'
				/>
			</Head>
			<Header />
			<main>
				<section>
					<div className='container py-20'>
						<div className='flex flex-col justify-center items-center max-w-4xl mx-auto'>
							<h1 className='text-[30px] lg:text-[70px] font-bold text-primary text-center leading-none'>
								Traduire vos fichier{" "}
								<span className='text-secondary'>.txt</span>{" "}
								<span className='text-secondary'>
									gratuitement
								</span>{" "}
								en secondes.
							</h1>
							<p className='text-center text-sm lg:text-xl my-2 lg:my-5'>
								On s'occupe de tout. Déposez votre fichier, nous
								le traduirons dans la langue de votre choix en
								quelques secondes et vous pouvez le télécharger.
							</p>
							<div className='flex flex-col lg:flex-row justify-center items-center my-4 lg:my-10'>
								<button
									className='bg-primary text-white font-bold py-2 px-8 mx-2 rounded-large cursor-pointer text-light'
									onClick={handleUploadFileCTABtnClick}>
									Chargez un fichier
								</button>
								<span className='text-gray-500'>
									ou deposez un fichier plus bas!
								</span>
							</div>
						</div>
					</div>
				</section>

				<section id='translator'>
					<div className='container py-10'>
						<div className='max-w-4xl mx-auto relative'>
							<div className='flex flex-col justify-center items-center w-full mx-auto relative'>
								{loading && (
									<div className='absolute top-0 h-full w-full bg-dark/50 grid place-items-center z-50'>
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
									</div>
								)}
								<div className='bg-accent/10 rounded-md shadow-sm p-4 lg:p-8 relative'>
									{error.size > 0 && makeErrors()}

									<div className='max-w-[300px] mx-auto'>
										<div className='flex flex-col lg:flex-row items-center lg:justify-start'>
											<label className='shrink-0 grow-0 mr-2'>
												{`Choisir une langue :`}
											</label>
											<select
												name='langue'
												className='mt-1 block w-full py-2 px-3 border border-primary/10 bg-light rounded-large shadow-large focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
												onChange={(e) =>
													setLang(
														languagesList.find(
															(l) =>
																l.value ===
																e.target.value
														)
													)
												}
												defaultValue={lang.value}>
												{languagesList.map((l) => {
													return (
														<option
															key={l.value}
															value={l.value}
															defaultValue={
																l.value ===
																lang.value
																	? true
																	: false
															}>
															{l.label}
														</option>
													);
												})}
											</select>
										</div>
									</div>
									<div className='w-full py-8 lg:flex lg:flex-row lg:gap-5'>
										<div>
											<textarea
												ref={dragZoneRef}
												onDragOver={handleDragOver}
												onDragLeave={handleDragLeave}
												onDrop={handleDrop}
												className='border border-primary/30
											w-full rounded-md min-w-[300px] lg:min-w-[400px]
											min-h-[300px] max-h-[300px] p-5
											text-base text-primary font-light
											focus:outline-none focus:ring-2
											focus:ring-primary/50 bg-primary/10'
												type='text'
												placeholder='Ecrivez
											votre text ici ou déposez un fichier
											.txt'
												onFocus={(e) =>
													(e.target.placeholder = "")
												}
												onBlur={(e) =>
													(e.target.placeholder =
														"Ecrivez votre text ici ou déposez un fichier .txt")
												}
												onChange={(e) =>
													handleChangeText(e)
												}
												value={text}></textarea>
										</div>
										<div>
											{translatedText.length > 0 && (
												<textarea
													className='border border-primary/30 w-full rounded-md min-w-[300px] lg:min-w-[400px]
													min-h-[300px] max-h-[300px] p-5 text-base text-primary font-light focus:outline-none focus:ring-2 focus:ring-primary/50 bg-primary/10'
													type='text'
													value={translatedText}
													readOnly={true}
													disabled={true}></textarea>
											)}
										</div>
									</div>
									<div>
										<div className='flex flex-row justify-end px-5 gap-2 items-center'>
											{!translatedText.length > 0 && (
												<button
													className='text-primary bg-light border border-primary/10 px-5 py-2 cursor-pointer rounded-large disabled:opacity-50 disabled:cursor-not-allowed'
													disabled={
														text.length > 0
															? false
															: true
													}
													onClick={handleSubmit}>
													Traduire en {lang.label}
												</button>
											)}
											{translatedText.length > 0 && (
												<>
													{!copied ? (
														<button
															className='flex flex-row items-center text-sm'
															onClick={(e) => {
																copyToclipBoard();
																setCopied(true);
																setTimeout(
																	() =>
																		setCopied(
																			false
																		),
																	2000
																);
															}}>
															<img src='/clipboard.svg' />{" "}
															<span>Copier</span>
														</button>
													) : (
														<span className='text-sm inline-block h-full'>
															Copié
														</span>
													)}

													<button
														className='flex flex-row items-center text-sm border border-primary/10 rounded-large px-8 py-2 hover:text-light hover:bg-primary'
														onClick={(e) => {
															e.preventDefault();
															downloadFromText();
														}}>
														<img src='/download.svg' />{" "}
														<span>Télécharger</span>
													</button>
												</>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
};

export default index;
