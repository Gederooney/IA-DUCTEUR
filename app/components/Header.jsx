import React from "react";

const Header = () => {
	return (
		<header>
			<div className='container'>
				<div className='flex flex-row justify-between border-b border-primary/10 py-2'>
					<a href='/'>
						<h1 className='lg:text-[35px] font-bold text-primary'>
							FileTranslator
						</h1>
					</a>

					<a
						href='/'
						className='flex flex-row items-center gap-2'>
						Etoilez sur
						<img
							src='/github.svg'
							alt='github'
							className='w-6 h-6'
						/>
					</a>
				</div>
			</div>
		</header>
	);
};

export default Header;
