import React from "react";
import Image from "next/image";

const Header = () => {
	return (
		<header className='sticky top-0 bg-light z-50'>
			<div className='container mx-auto '>
				<div className='flex flex-row justify-between py-2 border-b border-primary/10 items-center'>
					<div>
						<a
							href='/'
							target='_blank'
							rel='noopener noreferrer'
							className='flex flex-row items-center'>
							<Image
								className='w-[30px] h-[30px] lg:h-[40px] lg:w-[40px] lg:-mt-2 -mt-1'
								src='/images/logo.svg'
								width={40}
								height={40}
								alt='Logo'
							/>
							<span className='text-2xl font-black leading-none tracking-tighter lg:text-4xl text-primary'>
								IA-DUCTEUR
							</span>
						</a>
					</div>
					<div>
						<a
							href='https://github.com/Gederooney/app-ronygedeon'
							target='_blank'
							rel='noreferrer'
							className='inline-flex flex-row items-center gap-2 border border-primary/10 text-sm px-5 bg-primary text-light lg:h-[40px] h-[30px] rounded-large'>
							Etoilez sur
							<Image
								src='/images/github.svg'
								width={20}
								height={20}
								alt='github icon'
								className='w-4 h-4'
							/>
						</a>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
