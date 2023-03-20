import React, { useEffect } from "react";
import { useTraductorContext } from "@/Hooks/useContexts";
import useFileParse from "@/Hooks/useFileParse";

const TranslateTypeSelector = () => {
	const { context } = useTraductorContext();
	const { flow } = context;
	const { reset } = useFileParse();

	useEffect(() => {}, [flow]);

	return (
		<div className='flex flex-col lg:flex-row items-center justify-center gap-5'>
			<button
				className={`border-primary shadow-md bg-light px-5 py-3  text-primary font-medium flex flex-row gap-2 items-center  text-sm lg:text-base w-[200px] lg:w-auto hover:text-light hover:bg-primary ${
					flow === "text" && "border-b-4"
				}`}
				onClick={(e) => reset(flow !== "text")}>
				<span>
					<svg
						width='24'
						height='24'
						viewBox='0 0 24 24'
						focusable='false'
						stroke='currentColor'
						fill='currentColor'
						strokeWidth='0.05'
						strokeMiterlimit='10'
						xmlns='http://www.w3.org/2000/svg'>
						<path
							fillRule='evenodd'
							clipRule='evenodd'
							d='M12 22.6667C12.1452 22.6667 12.4288 22.5963 12.835 22.1545C13.2421 21.7117 13.6701 20.9972 14.0572 20.002C14.4852 18.9015 14.8313 17.5398 15.0546 16H8.94542C9.16867 17.5398 9.51485 18.9015 9.94284 20.002C10.3299 20.9972 10.7579 21.7117 11.165 22.1545C11.5712 22.5963 11.8548 22.6667 12 22.6667ZM8.78772 14.6667C8.70895 13.8159 8.66667 12.9231 8.66667 12C8.66667 11.0769 8.70895 10.1841 8.78772 9.33333H15.2123C15.291 10.1841 15.3333 11.0769 15.3333 12C15.3333 12.9231 15.291 13.8159 15.2123 14.6667H8.78772ZM16.4011 16C16.0268 18.7231 15.2811 20.9951 14.3206 22.4135C17.7698 21.6483 20.5907 19.2132 21.8913 16H16.4011ZM22.3306 14.6667H16.551C16.6267 13.809 16.6667 12.9165 16.6667 12C16.6667 11.0835 16.6267 10.191 16.551 9.33333H22.3306C22.55 10.1857 22.6667 11.0792 22.6667 12C22.6667 12.9208 22.55 13.8143 22.3306 14.6667ZM7.44897 14.6667H1.66938C1.45001 13.8143 1.33333 12.9208 1.33333 12C1.33333 11.0792 1.45001 10.1857 1.66938 9.33333H7.44897C7.37329 10.191 7.33333 11.0835 7.33333 12C7.33333 12.9165 7.37329 13.809 7.44897 14.6667ZM2.10869 16H7.59888C7.97317 18.7231 8.71886 20.9951 9.67943 22.4135C6.23022 21.6483 3.40935 19.2132 2.10869 16ZM8.94542 8H15.0546C14.8313 6.46017 14.4852 5.09853 14.0572 3.99798C13.6701 3.00276 13.2421 2.28833 12.835 1.84546C12.4288 1.40373 12.1452 1.33333 12 1.33333C11.8548 1.33333 11.5712 1.40373 11.165 1.84546C10.7579 2.28833 10.3299 3.00276 9.94284 3.99798C9.51485 5.09853 9.16867 6.46017 8.94542 8ZM16.4011 8H21.8913C20.5907 4.78684 17.7698 2.3517 14.3206 1.58648C15.2811 3.00492 16.0268 5.2769 16.4011 8ZM9.67943 1.58648C8.71885 3.00492 7.97317 5.2769 7.59888 8H2.10869C3.40934 4.78684 6.23022 2.3517 9.67943 1.58648ZM12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z'></path>
					</svg>
				</span>
				<span className=' max-w-[150px] flex flex-col'>
					<span className='font-bold'>Traduire du texte</span>
					<span>Plusieurs langues</span>
				</span>
			</button>
			<button
				className={`border-primary shadow-md bg-light px-5 py-3  text-primary font-medium flex flex-row gap-2 items-center  text-sm lg:text-base w-[200px] lg:w-auto hover:text-light hover:bg-primary ${
					flow === "file" && "border-b-4"
				}`}
				onClick={(e) => reset(flow !== "file")}>
				<span>
					<svg
						className='svgIcon--SYoRT'
						focusable='false'
						width={24}
						viewBox='0 0 39 47'>
						<path
							d='M37.9075 45.3682H1V1.15356H31.1319L34.6023 5.02234L37.9075 8.89112V45.3682Z'
							strokeWidth='2'
							strokeMiterlimit='10'></path>
						<path
							d='M30.7461 1.15356V8.89112H37.7971'
							strokeWidth='2'
							strokeMiterlimit='10'></path>
						<path
							d='M10.7734 15.4951H29.0458'
							strokeWidth='2'></path>
						<path
							d='M10.7734 23.7177H29.0458'
							strokeWidth='2'></path>
						<path
							d='M10.7734 31.9403H29.0458'
							strokeWidth='2'></path>
					</svg>
				</span>
				<span className=' max-w-[150px] flex flex-col'>
					<span className='font-bold'>Traduire un fichier</span>
					<span>.txt, .pdf</span>
				</span>
			</button>
		</div>
	);
};

export default TranslateTypeSelector;
