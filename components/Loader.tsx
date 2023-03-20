import React from "react";

const Loader = () => {
	return (
		<div className='w-full h-full grid place-items-center'>
			<div className='lds-roller'>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
};

export default Loader;
