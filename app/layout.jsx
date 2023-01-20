export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<link rel='shortcut icon' href='/logo' type='image/svg' />
			<head />
			<body>{children}</body>
		</html>
	);
}
