"use client";

import React, { useState, useEffect } from "react";
import Filereader from "./components/fileReader";
import "./styles/main.css";

const Page = () => {
	const [type, setType] = useState("");
	useEffect(() => {}, [type]);
	return (
		<div className='content'>
			<h1>Bonjour</h1>
			<p>Comment voulez-vous traduire un texte aujourd'hui?</p>
			<div className='btns'>
				<button onClick={(e) => setType("file")}>Par fichier</button>
				<button onClick={(e) => setType("text")}>
					j'écrirai le texte
				</button>
			</div>
			{type ? <Filereader type={type} /> : <></>}
		</div>
	);
};

export default Page;
