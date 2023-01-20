import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Translator from "@/app/components/Translator";
import "@/app/styles/main.css";
import "@/app/styles/loader.css";
import store from "@/app/redux/store";
import { setLoading } from "@/app/redux/reducers/global";
import { setTranlateType } from "@/app/redux/features/translator-slice";

const index = () => {
	const loading = useSelector((state) => state.global.loading);
	const type = useSelector((state) => state.translator.translateType);
	useEffect(() => {
		store.dispatch(setLoading(false));
	}, []);

	return (
		<>
			{loading && (
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
			)}
			{type
				? !loading && (
						<div className='header'>
							<p>
								Vous utilisez le traducteur par:{" "}
								{type === "file" ? "fichier" : "texte"}
							</p>
							<button
								onClick={(e) =>
									store.dispatch(setTranlateType(null))
								}
							>
								Changez de méthode
							</button>
						</div>
				  )
				: !loading && (
						<>
							<h1>Bonjour</h1>
							<p className='bodyCopy'>
								Comment voulez-vous traduire un texte
								aujourd'hui?
							</p>
							<div className='btns'>
								<button
									onClick={(e) => {
										e.preventDefault();
										return store.dispatch(
											setTranlateType("file")
										);
									}}
								>
									Par fichier
								</button>
								<button
									onClick={(e) =>
										store.dispatch(setTranlateType("text"))
									}
								>
									Par texte
								</button>
							</div>
						</>
				  )}
			{!loading && type && <Translator />}
		</>
	);
};

export default index;
