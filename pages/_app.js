import React from "react";
import App from "next/app";
import { Provider } from "react-redux";
import store from "@/app/redux/store";
import Head from "next/head";

import "@/app/styles/main.css";
import "@/app/styles/loader.css";

class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;
		return (
			<Provider store={store}>
				<Head>
					<link rel='shortcut icon' href='/logo.svg' />
					<title>Traducteur de Text - Rony Gedeon</title>
				</Head>
				<Component {...pageProps} />
			</Provider>
		);
	}
}

export default MyApp;
