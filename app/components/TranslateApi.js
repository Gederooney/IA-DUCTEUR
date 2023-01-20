"use client";
import React, { useEffect, useState } from "react";
import Translation from "./Translation";
import axios from "axios";

const TranslateAPI = (props) => {
	const { text, file } = props;
	const [responseData, setResponseData] = useState(null);

	useEffect(() => {
		const makeRequest = async () => {
			if (text) {
				const response = await axios.post("your api endpoint", {
					text,
				});
				setResponseData(response.data);
			} else if (file) {
				const formData = new FormData();
				formData.append("file", file);
				const response = await axios.post(
					"your api endpoint",
					formData
				);
				setResponseData(response.data);
			}
		};
		makeRequest();
	}, [text, file]);

	return (
		<>
			{responseData && <Translation translation={responseData} /> && (
				<Error error={responseData.error} />
			)}
		</>
	);
};

export default TranslateAPI;
