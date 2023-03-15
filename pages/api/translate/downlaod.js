import path from "path";

const handler = async (req, res) => {
	const { method } = req;

	switch (method) {
		case "GET":
			try {
				const filePath = path.join(process.cwd(), "public", "test.txt");
				res.download(filePath);
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		default:
			res.setHeader("Allow", ["GET"]);
			res.status(405).end(`Method ${method} Not Allowed`);
	}
};
