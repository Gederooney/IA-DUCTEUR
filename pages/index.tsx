import { useState } from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Translator from "@/components/Translator";
import { TraductorContext } from "@/Hooks/Contexts";
import { IContext } from "@/types";
import Footer from "@/components/Footer";

export default function Home() {
	const [context, setContext] = useState<IContext>({
		flow: "file",
		file: null,
		previewUrl: undefined,
		text: "",
		lang: {
			label: "anglais (américain)",
			key: "en-US",
		},
		error: new Map(),
		maxFileSize: {
			"text/plain": 1 * 1024 * 1024,
			"application/pdf": 2 * 1024 * 1024,
			"application/msword": 2 * 1024 * 1024,
		},
		loading: false,
		translatedText: undefined,
		translatedFileUrl: undefined,
	});
	return (
		<TraductorContext.Provider value={{ context, setContext }}>
			<Head>
				<title>Traducteur de Fichiers par Rony Gedeon</title>
				<meta
					name='description'
					content='Generated by create next app'
				/>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1'
				/>
				<link
					rel='icon'
					href='/images/logo.svg'
				/>
			</Head>
			<main className="min-h-screen">
				<Header />
				<Hero />
				<Translator />
				<Footer />
			</main>
		</TraductorContext.Provider>
	);
}
