import React from "react";

const Error = ({ errorMessage }) => {
	console.log(errorMessage);
	return (
		<>
			{errorMessage && (
				<div className='errorBox'>
					<p>{errorMessage}</p>
				</div>
			)}
		</>
	);
};

export default Error;
