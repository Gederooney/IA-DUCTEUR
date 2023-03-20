import React, { useEffect, useState, useRef } from "react";
import { useTraductorContext } from "@/Hooks/useContexts";
import useFileParse from "@/Hooks/useFileParse";
import FileUploadBox from "./FileUploadBox";
import LanguageList from "./LanguageList";
import TranslateTypeSelector from "./TranslateTypeSelector";
import Submitor from "./Submitor";
import TexteTranslate from "./TexteTranslate";
import Errors from "./Errors";
import Loader from "./Loader";

const Translator = () => {
	const { context } = useTraductorContext();
	const { flow, error, loading } = context;

	const isError = error.size > 0;

	useEffect(() => {}, [error, loading]);

	return (
		<section id='translator'>
			<div className='container mx-auto'>
				<div className='flex flex-col'>
					<TranslateTypeSelector />
					<Errors />
					<div className='my-10 flex flex-col items-center'>
						<div
							className={`w-full relative max-w-2xl border rounded-md overflow-hidden ${
								isError
									? "border-error/50"
									: "border-primary/10"
							}`}>
							<LanguageList />
							<div className='relative'>
								{flow === "file" ? (
									<FileUploadBox />
								) : (
									<TexteTranslate />
								)}

								{loading && (
									<div className='absolute z-50 h-full w-full bg-primary/30 top-0'>
										<Loader />
									</div>
								)}
							</div>
							<Submitor />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Translator;
