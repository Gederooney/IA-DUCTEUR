import React from "react";

const Footer = () => {
	return (
		<footer className='bg-primary py-2 bottom-0 w-full'>
			<div className='container mx-auto'>
				<div>
					<p className='text-center text-sm text-light'>
						&copy; 2021 - {new Date().getFullYear()}{" "}
						<a
							href='
							https://ronygedeon.com'
							target='_blank'
							rel='noreferrer'
							className='text-accent'>
							Rony Gedeon
						</a>
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
