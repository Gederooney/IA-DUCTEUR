import React from "react";

const Error = ({ errorMessage }) => {
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
