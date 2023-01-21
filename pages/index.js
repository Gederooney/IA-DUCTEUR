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
							<h3>
								Vous utilisez le traducteur par:{" "}
								{type === "file" ? "fichier" : "texte"}
							</h3>
							<button
								onClick={(e) =>
									store.dispatch(setTranlateType(null))
								}
								className='goBack'
							>
								<svg
									clipRule='evenodd'
									fillRule='evenodd'
									strokeLinejoin='round'
									strokeMiterlimit='2'
									viewBox='0 0 24 24'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='m9.474 5.209s-4.501 4.505-6.254 6.259c-.147.146-.22.338-.22.53s.073.384.22.53c1.752 1.754 6.252 6.257 6.252 6.257.145.145.336.217.527.217.191-.001.383-.074.53-.221.293-.293.294-.766.004-1.057l-4.976-4.976h14.692c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-14.692l4.978-4.979c.289-.289.287-.761-.006-1.054-.147-.147-.339-.221-.53-.221-.191-.001-.38.071-.525.215z'
										fillRule='nonzero'
									/>
								</svg>
								Retour
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
