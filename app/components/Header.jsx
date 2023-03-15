import React from "react";

const Header = () => {
	return (
		<header>
			<div className='container'>
				<div className='flex flex-row justify-between border-b border-primary/10 py-2 items-center'>
					<a href='/'>
						<h1 className='lg:text-[35px] font-bold text-primary'>
							FileTranslator
						</h1>
					</a>

					<a
						href='https://github.com/Gederooney/app-ronygedeon'
						target='_blank'
						rel='noreferrer'
						className='inline-flex flex-row items-center gap-2 border border-primary/10 text-sm px-5 bg-primary text-light h-[40px] rounded-large'>
						Etoilez sur
						<img
							src='/github.svg'
							alt='github'
							className='w-4 h-4'
						/>
					</a>
				</div>
			</div>
		</header>
	);
};

export default Header;
