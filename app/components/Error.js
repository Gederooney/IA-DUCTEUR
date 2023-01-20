import React from "react";

const Error = ({ errorMessage }) => {
	return <>{errorMessage && <p>{errorMessage}</p>}</>;
};

export default Error;
