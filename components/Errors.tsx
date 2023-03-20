import React, { useEffect } from "react";
import { useTraductorContext } from "@/Hooks/useContexts";

const Errors = () => {
	const { context, setContext } = useTraductorContext();
	const { error } = context;

	useEffect(() => {}, [error]);

	const makeErrors = () => {
		let rtn: JSX.Element[] = [];
		if (error.size > 0) {
			error.forEach((err, key) => {
				rtn.push(
					<div
						key={key}
						className='mx-auto my-2'>
						<div className='bg-error/10 text-center flex justify-between items-center p-2 animateDown text-primary text-sm'>
							<span>{err}</span>
							<button
								className='rounded-full h-[14px] w-[14px] border border-primary/10 text-primary'
								onClick={() => {
									error.delete(key);
									setContext({ ...context, error });
								}}>
								<svg
									width='12'
									height='12'
									viewBox='0 0 24 24'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'>
									<path
										d='M6 18L18 6M6 6L18 18'
										stroke='#727A83'
										strokeWidth='1.5'
										strokeLinecap='round'
										strokeLinejoin='round'></path>
								</svg>
							</button>
						</div>
					</div>
				);
			});
		}
		return rtn;
	};

	return (
		<div className='my-5'>
			<div className='container mx-auto'>
				<div className='max-w-sm mx-auto'>{makeErrors()}</div>
			</div>
		</div>
	);
};

export default Errors;
