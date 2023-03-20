import { useTraductorContext } from "@/Hooks/useContexts";
import React, { useEffect, useRef, useState } from "react";
import useFileParse from "@/Hooks/useFileParse";
import FileUploadBox from "./FileUploadBox";

function Hero() {
	

	return (
		<section>
			<div className='container mx-auto'>
				<div className='flex flex-cols justify-center items-center py-10 lg:py-20'>
					<div className='max-w-5xl'>
						<h1 className='text-4xl lg:text-[90px] font-black text-center leading-tight tracking-tighter text-primary'>
							Traduisez vos{" "}
							<span className='inline-block relative text-secondary'>
								fichiers
								<span className='absolute w-full left-0 top-3/4 fill-accent stroke-none'>
									<svg
										id='Calque_2'
										data-name='Calque 2'
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 89.98 5.96'>
										<g
											id='Calque_1-2'
											data-name='Calque 1'>
											<path d='m1.89,5.93c22.64-3.12,45.62-3.76,68.4-1.94,5.95.48,11.89,1.12,17.81,1.94.81.11,1.6-.2,1.85-1.05.2-.7-.25-1.73-1.05-1.85C65.76-.15,42.33-.86,19.06,1.05c-6.01.49-12,1.17-17.97,1.99-.81.11-1.23,1.14-1.05,1.85.23.87,1.05,1.16,1.85,1.05h0Z' />
										</g>
									</svg>
								</span>
							</span>{" "}
							<span className='inline-block relative text-secondary'>
								gratuitement
								<svg
									aria-hidden='true'
									viewBox='0 0 418 42'
									className='absolute top-1/2 left-0 h-[0.58em] w-full fill-accent'
									preserveAspectRatio='none'>
									<path d='M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z'></path>
								</svg>
							</span>{" "}
							en secondes
						</h1>
						<p className='text-center font-medium text-primary text-base lg:text-xl my-5 leading-tight tracking-tight'>
							IA-DUCTEUR est une application web qui vous permet
							de traduire vos fichiers{" "}
							<span className='text-accent font-bold text-xl'>
								{" "}
								pdf, word, Power Point
							</span>{" "}
							et{" "}
							<span className='text-accent font-bold text-xl'>
								texte
							</span>{" "}
							gratuitement en quelques secondes. GLissez votre
							fichier et choississez la langue on s&rsquo;occupe
							du reste.
						</p>
						
					</div>
				</div>
			</div>
		</section>
	);
}

export default Hero;
