import React, { useState } from "react";

const Translation = (props) => {
	const [translation, setTranslation] = useState("");

	return (
		<div>
			<p>{translation}</p>
		</div>
	);
};

export default Translation;
