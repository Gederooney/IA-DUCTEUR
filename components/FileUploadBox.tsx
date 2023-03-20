import React, { useRef } from "react";
import useFileParse from "@/Hooks/useFileParse";
import { useTraductorContext } from "@/Hooks/useContexts";
import Image from "next/image";

const FileUploadBox = () => {
	const dragZoneRef = useRef<HTMLDivElement>(null);
	const { context, setContext } = useTraductorContext();

	const { previewUrl, file } = context;

	const { handleDragOver, handleDragLeave, handleDrop, handleCTAClick } =
		useFileParse();

	if (previewUrl) {
		return (
			<>
				<div className='relative'>
					<div className='relative top-0 left-0 w-full bg-primary/10 h-[500px]'>
						<embed
							type={file?.type}
							src={previewUrl}
							height='100%'
							width='100%'
						/>
					</div>
				</div>
			</>
		);
	}

	return (
		<div className='relative'>
			<div className='max-w-sm flex flex-row justify-center items-center mx-auto gap-5'>
				<Image
					src='/images/icon_pdf.svg'
					width={100}
					height={100}
					alt='pdf icon'
				/>
				<Image
					src='/images/icon_txt.svg'
					width={100}
					height={100}
					alt='pdf icon'
				/>
			</div>
			<div className='block py-10'>
				<div
					className='mx-auto max-w-sm p-5 text-center flex flex-col bg-light rounded-md'
					ref={dragZoneRef}
					onDragLeave={handleDragLeave}
					onDragOver={handleDragOver}
					onDrop={handleDrop}>
					<button
						className='inline w-50 mx-auto px-5 py-1 border border-primary/20 rounded-md text-base font-medium text-primary'
						id='upload'
						onClick={handleCTAClick}>
						Choisir un fichier
					</button>{" "}
					<span className='my-2 text-sm text-primary'>
						ou glissez un fichier ici
					</span>
				</div>
			</div>
		</div>
	);
};

export default FileUploadBox;
