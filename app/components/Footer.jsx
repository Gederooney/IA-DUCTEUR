import React from "react";

const Footer = () => {
	return (
		<section className='bg-primary'>
			<div className='container'>
				<div className='py-4'>
					<p className='text-center text-light text-sm'>
						&copy; 2023 - {new Date().getFullYear()} tous droits
						réservés. Créé par{" "}
						<a
							href='https://ronygedeon.com/'
							target='_blank'
							rel='noreferrer'
							className='font-bold'>
							Rony Gedeon
						</a>
					</p>
				</div>
			</div>
		</section>
	);
};

export default Footer;
