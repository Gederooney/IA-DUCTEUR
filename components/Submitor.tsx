import React, { useEffect } from "react";
import useFileParse from "@/Hooks/useFileParse";
import { useTraductorContext } from "@/Hooks/useContexts";

const Submitor = () => {
	const { submit } = useFileParse();
	const { context, setContext } = useTraductorContext();
	const { lang, error, text, file, loading, translatedText } = context;
	const [copied, setCopied] = React.useState(false);

	const handleSubmit = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
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
		if (loading) return;
		submit();
	};

	const copyToclipBoard = (e: React.MouseEvent<HTMLButtonElement>) => {
		navigator.clipboard.writeText(translatedText as string).then(
			() => {},
			() => {}
		);
	};

	const downloadFromText = (e: React.MouseEvent<HTMLButtonElement>) => {
		const blob = new Blob([translatedText as string], {
			type: "text/plain",
		});
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `traduit.txt`;
		a.click();
		return;
	};

	useEffect(() => {}, [lang]);
	return (
		<div className='relative'>
			<div className='relative py-3 border-b border-primary/10 z-50 bg-light '>
				<div className='flex justify-end'>
					<button
						className='mx-5 px-5 py-1 border border-primary rounded-md inline-flex justify-between items-center text-primary hover:text-light hover:bg-primary text-sm lg:text-base w-[175px] lg:w-auto'
						onClick={handleSubmit}>
						<span>Traduire en {lang.label}</span>
						<span className='ml-4'>
							<svg
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									d='M14 5L21 12M21 12L14 19M21 12L3 12'
									stroke='#727A83'
									strokeWidth='1.5'
									strokeLinecap='round'
									strokeLinejoin='round'></path>
							</svg>
						</span>
					</button>
					{translatedText && (
						<>
							<button
								className='flex flex-row items-center border border-primary py-1 rounded-md w-[100px] mr-2 justify-center text-sm lg:text-base text-primary'
								onClick={(e) => {
									copyToclipBoard(e);
									setCopied(true);
									setTimeout(() => setCopied(false), 2000);
								}}>
								{!copied ? (
									<>
										<span className='inline'>
											<svg
												stroke='#f7fafc'
												stroke-width='2'
												viewBox='0 0 24 24'
												stroke-linecap='round'
												stroke-linejoin='round'
												className='h-5 w-5 -mt-1 fill-primary'
												height='16'
												width='16'
												xmlns='http://www.w3.org/2000/svg'>
												<path d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'></path>
												<rect
													x='8'
													y='2'
													width='8'
													height='4'
													rx='1'
													ry='1'></rect>
											</svg>
										</span>{" "}
										<span className='inline'>Copier</span>
									</>
								) : (
									<span className='inline h-full'>
										Copié !!
									</span>
								)}
							</button>

							<button
								className='flex flex-row items-center text-sm border border-primary rounded-md px-2 py-2 hover:text-primary hover:bg-light  lg:text-base mr-2 text-light bg-primary'
								onClick={(e) => {
									e.preventDefault();
									downloadFromText(e);
								}}>
								<span>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='16'
										height='16'
										viewBox='0 0 24 24'
										strokeWidth={2}>
										<path d='M8 20h3v-5h2v5h3l-4 4-4-4zm11.479-12.908c-.212-3.951-3.473-7.092-7.479-7.092s-7.267 3.141-7.479 7.092c-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h3.5v-2h-3.5c-1.93 0-3.5-1.57-3.5-3.5 0-2.797 2.479-3.833 4.433-3.72-.167-4.218 2.208-6.78 5.567-6.78 3.453 0 5.891 2.797 5.567 6.78 1.745-.046 4.433.751 4.433 3.72 0 1.93-1.57 3.5-3.5 3.5h-3.5v2h3.5c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408z'></path>
									</svg>
								</span>
								<span>Télécharger</span>
							</button>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Submitor;
