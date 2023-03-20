import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang='en'>
			<link
				rel='shortcut icon'
				href='/images/logo.svg'
				type='image/svg'
			/>
			<Head />
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
