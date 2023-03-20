import React from "react";
import { useTraductorContext } from "@/Hooks/useContexts";

const TexteTranslate = () => {
	const { context, setContext } = useTraductorContext();
	const { text, translatedText } = context;

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setContext({ ...context, text: e.target.value });
	};

	return (
		<div className='flex flex-col lg:grid lg:grid-rows-1 lg:grid-cols-2 gap-2 p-1'>
			<div className='border border-primary/10'>
				<textarea
					className='
			w-full min-w-[300px] lg:w-[50%]
			min-h-[300px] max-h-[300px] p-5
			text-base text-primary font-light
			focus:outline-none
			 '
					placeholder='Ecrivez
			votre texte ici ou déposez un fichier
			.txt'
					onFocus={(e) => (e.target.placeholder = "")}
					onBlur={(e) =>
						(e.target.placeholder =
							"Ecrivez votre texte ici ou déposez un fichier .txt")
					}
					onChange={handleChange}
					value={text}></textarea>
			</div>

			<div className='border border-primary/10'>
				<textarea
					className='
				w-full min-w-[300px] lg:w-[50%]
				min-h-[300px] max-h-[300px] p-5
				text-base text-primary font-light
				focus:outline-none
				 '
					placeholder="Le texte traduit s'affichera ici"
					readOnly={true}
					disabled={true}
					value={translatedText}></textarea>
			</div>
		</div>
	);
};

export default TexteTranslate;
