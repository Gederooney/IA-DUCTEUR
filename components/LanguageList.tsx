import React, { useState, useRef } from "react";
import { useTraductorContext } from "../Hooks/useContexts";
import { languagesList } from "../data/langs";

const LanguageList = () => {
	const { context, setContext } = useTraductorContext();

	const { lang } = context;
	const [showLangList, setShowLangList] = useState(false);

	const langlistRef = useRef<HTMLDivElement>(null);

	function handleLangListClick(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		if (langlistRef.current) {
			langlistRef.current.classList.add("move-up");
			langlistRef.current.classList.remove("move-down");
			setTimeout(() => {
				langlistRef.current?.classList.remove("move-up");
				langlistRef.current?.classList.add("move-down");
				setShowLangList(false);
			}, 300);
			return;
		}
		setShowLangList(true);
	}

	return (
		<div className='relative'>
			<div className='relative py-3 border-b border-primary/10 z-40 bg-light '>
				<p className='text-center'>
					<span>Choisir la langue cible</span>
					<button
						className='mx-5 px-5 py-1 border border-primary/50 rounded-md inline-flex justify-between items-center text-primary'
						onClick={handleLangListClick}>
						<span>{lang.label}</span>
						<span className='ml-8'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth='1'
								width='18'
								height='18'
								stroke='currentColor'
								aria-hidden='true'
								className={`transition-transform duration-300 ease-in-out ${
									showLangList ? "-rotate-180" : ""
								}`}>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									vectorEffect='non-scaling-stroke'
									d='M19.5 8.25l-7.5 7.5-7.5-7.5'></path>
							</svg>
						</span>
					</button>
				</p>
			</div>
			{showLangList && (
				<div
					className={`absolute top-[100%] p-4 bg-light move-down z-30 h-[300px] overflow-scroll`}
					ref={langlistRef}>
					<div className='flex flex-row flex-wrap gap-4 justify-center'>
						{languagesList.map((l) => (
							<button
								className='flex flex-row justify-between items-center px-5 py-1 border border-primary/10 hover:text-light hover:bg-primary'
								key={l.key + l.label}
								onClick={(e) => {
									e.preventDefault();
									setContext({ ...context, lang: l });

									console.log(l);
								}}>
								<span className='flex flex-row gap-2 items-center'>
									<span></span>
									<span>{l.label}</span>
								</span>
							</button>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default LanguageList;
